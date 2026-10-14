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

  it('executes mock transport fallback gracefully when backend is unreachable', async () => {
    // Force live fetch failure to verify fallback
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Failed to fetch'))
    );

    const res = await apiClient<{ id: string; slug: string }>('/courses/japanese-foundations');
    expect(res).toBeDefined();
    expect(res.slug).toBe('japanese-foundations');
  });
});
