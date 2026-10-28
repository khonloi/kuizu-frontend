import { describe, it, expect, vi, beforeEach } from 'vitest';
import { normalizeEndpoint, ApiError, apiClient, api } from '../api';

describe('API Client & Transport Utility', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('normalizes endpoints with leading slash and /api/v1 prefix correctly', () => {
    expect(normalizeEndpoint('courses')).toBe('/api/v1/courses');
    expect(normalizeEndpoint('/courses')).toBe('/api/v1/courses');
    expect(normalizeEndpoint('/api/v1/courses')).toBe('/api/v1/courses');
    expect(normalizeEndpoint('/api/health')).toBe('/api/health');
    expect(normalizeEndpoint('http://localhost:4000/api/v1/quizzes')).toBe(
      'http://localhost:4000/api/v1/quizzes'
    );
  });

  it('instantiates ApiError with statusCode, message, and error details', () => {
    const err = new ApiError(404, 'Course not found', { resourceId: 'c-123' });
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Course not found');
    expect(err.errors).toEqual({ resourceId: 'c-123' });
    expect(err.name).toBe('ApiError');
  });

  it('provides convenience HTTP verb methods', () => {
    expect(typeof api.get).toBe('function');
    expect(typeof api.post).toBe('function');
    expect(typeof api.put).toBe('function');
    expect(typeof api.patch).toBe('function');
    expect(typeof api.delete).toBe('function');
  });

  it('handles 204 No Content responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 204,
      })
    );

    const res = await apiClient('/api/v1/users/me', { method: 'DELETE' });
    expect(res).toEqual({});
  });

  it('handles HTTP error responses and parses message correctly', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: ['Email is invalid', 'Password too short'] }),
      })
    );

    await expect(apiClient('/api/v1/auth/register')).rejects.toThrow(
      'Email is invalid, Password too short'
    );
  });

  it('handles 401 and successfully refreshes token and retries', async () => {
    let callCount = 0;
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/api/v1/auth/refresh')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => ({ success: true }),
          });
        }
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            ok: false,
            status: 401,
            json: async () => ({ message: 'Unauthorized' }),
          });
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ id: 'u1', username: 'testuser' }),
        });
      })
    );

    const res = await apiClient<{ id: string }>('/api/v1/users/me');
    expect(res.id).toBe('u1');
    expect(callCount).toBe(2);
  });

  it('handles 401 when refresh fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/api/v1/auth/refresh')) {
          return Promise.resolve({
            ok: false,
            status: 401,
            json: async () => ({ message: 'Token expired' }),
          });
        }
        return Promise.resolve({
          ok: false,
          status: 401,
          json: async () => ({ message: 'Unauthorized' }),
        });
      })
    );

    await expect(apiClient('/api/v1/users/me')).rejects.toThrow('Unauthorized');
  });

  it('triggers exactly one refresh call when 10 concurrent requests return 401', async () => {
    let refreshCount = 0;
    const endpointCounts: Record<string, number> = {};

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(async (url: string) => {
        if (url.includes('/api/v1/auth/refresh')) {
          refreshCount++;
          // Simulate slight async network delay
          await new Promise((resolve) => setTimeout(resolve, 10));
          return {
            ok: true,
            status: 200,
            json: async () => ({ success: true }),
          };
        }

        endpointCounts[url] = (endpointCounts[url] || 0) + 1;
        if (endpointCounts[url] === 1) {
          return {
            ok: false,
            status: 401,
            json: async () => ({ message: 'Unauthorized' }),
          };
        }

        return {
          ok: true,
          status: 200,
          json: async () => ({ data: url }),
        };
      })
    );

    const promises = Array.from({ length: 10 }, (_, i) =>
      apiClient<{ data: string }>(`/api/v1/resource-${i}`)
    );

    const results = await Promise.all(promises);
    expect(results).toHaveLength(10);
    expect(refreshCount).toBe(1);
  });

  it('handles request timeout via AbortController', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((_url, opts) => {
        return new Promise((_, reject) => {
          opts.signal.addEventListener('abort', () => {
            reject(new Error('AbortError'));
          });
        });
      })
    );

    await expect(
      apiClient('/api/v1/slow', { timeout: 10 })
    ).rejects.toThrow('Request timed out after 10ms');
  });

  it('executes mock transport fallback gracefully when backend is unreachable in demo mode', async () => {
    const prevEnv = process.env.NEXT_PUBLIC_DEMO_MODE;
    process.env.NEXT_PUBLIC_DEMO_MODE = 'true';
    try {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Failed to fetch'))
      );

      const res = await apiClient<{ id: string; slug: string }>('/courses/chinese-foundations');
      expect(res).toBeDefined();
      expect(res.slug).toBe('chinese-foundations');
    } finally {
      process.env.NEXT_PUBLIC_DEMO_MODE = prevEnv;
    }
  });

  it('throws ApiError when backend is unreachable outside demo mode', async () => {
    const prevEnv = process.env.NEXT_PUBLIC_DEMO_MODE;
    delete process.env.NEXT_PUBLIC_DEMO_MODE;
    try {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Failed to fetch'))
      );

      await expect(
        apiClient('/courses/chinese-foundations')
      ).rejects.toThrow('Failed to fetch');
    } finally {
      process.env.NEXT_PUBLIC_DEMO_MODE = prevEnv;
    }
  });
});

