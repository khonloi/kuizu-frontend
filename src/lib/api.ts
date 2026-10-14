import { handleMockApiRequest } from '@/mock/mock-handler';

export interface ApiClientOptions extends RequestInit {
  timeout?: number;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Concurrency mutex state for silent token refresh
let isRefreshing = false;
let refreshSubscribers: Array<(success: boolean) => void> = [];

function subscribeTokenRefresh(cb: (success: boolean) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(success: boolean) {
  refreshSubscribers.forEach((cb) => cb(success));
  refreshSubscribers = [];
}

/**
 * Normalizes API endpoint to include /api/v1 prefix when needed
 */
export function normalizeEndpoint(endpoint: string): string {
  if (endpoint.startsWith('http')) return endpoint;

  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If already starts with /api/v1 or /api/health, keep as-is
  if (clean.startsWith('/api/')) {
    return clean;
  }

  // Prepend default versioned prefix
  return `/api/v1${clean}`;
}

/**
 * Transport Adapter Interface
 */
export interface TransportAdapter {
  execute<T>(url: string, options: ApiClientOptions): Promise<T | null>;
}

/**
 * Offline & Demo Mode Mock Transport
 */
export const mockTransportAdapter: TransportAdapter = {
  async execute<T>(url: string, options: ApiClientOptions): Promise<T | null> {
    try {
      const parsedBody =
        options.body && typeof options.body === 'string'
          ? JSON.parse(options.body)
          : options.body;
      return await handleMockApiRequest<T>(url, options.method || 'GET', parsedBody);
    } catch {
      return null;
    }
  },
};

/**
 * Standard Production HTTP Fetch Transport with Timeout and Token Refresh
 */
export async function executeHttpFetch<T>(
  url: string,
  options: ApiClientOptions,
  isRetry = false,
): Promise<T> {
  const timeoutMs = options.timeout ?? 15000;
  const controller = new AbortController();
  let timerId: ReturnType<typeof setTimeout> | null = null;

  if (timeoutMs > 0) {
    timerId = setTimeout(() => {
      controller.abort(new Error(`Request timeout after ${timeoutMs}ms`));
    }, timeoutMs);
  }

  // Chain external signal if provided
  if (options.signal) {
    options.signal.addEventListener('abort', () => controller.abort());
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: 'include',
    });
  } catch (err: unknown) {
    if (controller.signal.aborted) {
      throw new ApiError(408, `Request timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    if (timerId) clearTimeout(timerId);
  }

  // Handle 401 Unauthorized for automatic token refresh (except for auth endpoints)
  const isAuthRoute =
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh');

  if (response.status === 401 && !isRetry && !isAuthRoute) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshRes = await fetch('/api/v1/auth/refresh', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (refreshRes.ok) {
          isRefreshing = false;
          onRefreshed(true);
          return executeHttpFetch<T>(url, options, true);
        } else {
          isRefreshing = false;
          onRefreshed(false);
        }
      } catch {
        isRefreshing = false;
        onRefreshed(false);
      }
    } else {
      // Wait for active refresh to resolve, then retry or abort
      return new Promise<T>((resolve, reject) => {
        subscribeTokenRefresh((success) => {
          if (success) {
            resolve(executeHttpFetch<T>(url, options, true));
          } else {
            reject(new ApiError(401, 'Session expired. Please log in again.'));
          }
        });
      });
    }
  }

  if (!response.ok) {
    let errorData: { message?: string | string[]; error?: string; errors?: unknown } | null = null;
    try {
      errorData = (await response.json()) as { message?: string | string[]; error?: string; errors?: unknown };
    } catch {
      errorData = { message: response.statusText };
    }

    const message = Array.isArray(errorData?.message)
      ? errorData.message.join(', ')
      : errorData?.message || `HTTP error ${response.status}`;

    throw new ApiError(
      response.status,
      message,
      errorData?.errors,
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiClientOptions = {},
  isRetry = false,
): Promise<T> {
  const url = normalizeEndpoint(endpoint);

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const requestOptions: ApiClientOptions = {
    ...options,
    headers,
  };

  // 1. Offline Demo Mode Check
  if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
    const mockRes = await mockTransportAdapter.execute<T>(url, requestOptions);
    if (mockRes !== null) {
      return mockRes;
    }
  }

  // 2. Live HTTP Request
  try {
    return await executeHttpFetch<T>(url, requestOptions, isRetry);
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    // 3. Fallback to offline mock handler if backend connection fails
    const mockFallback = await mockTransportAdapter.execute<T>(url, requestOptions);
    if (mockFallback !== null) {
      return mockFallback;
    }

    throw new ApiError(0, (err as Error).message || 'Network connection error');
  }
}

export const api = {
  get: <T>(endpoint: string, options?: ApiClientOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: ApiClientOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: ApiClientOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: ApiClientOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: ApiClientOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
