import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '../proxy';

describe('Edge Proxy route guard', () => {
  it('allows access to public routes', () => {
    const req = new NextRequest('http://localhost:3000/');
    const res = proxy(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('redirects unauthenticated users on protected routes to /login with returnUrl', () => {
    const req = new NextRequest('http://localhost:3000/learn');
    const res = proxy(req);
    expect(res.status).toBe(307);
    const location = res.headers.get('location');
    expect(location).toContain('/login?returnUrl=%2Flearn');
  });

  it('redirects unauthenticated users on nested protected routes like /lesson/intro', () => {
    const req = new NextRequest('http://localhost:3000/lesson/intro');
    const res = proxy(req);
    expect(res.status).toBe(307);
    const location = res.headers.get('location');
    expect(location).toContain('/login?returnUrl=%2Flesson%2Fintro');
  });

  it('allows access to protected routes when access_token cookie is present', () => {
    const req = new NextRequest('http://localhost:3000/learn', {
      headers: { cookie: 'access_token=valid-token' },
    });
    const res = proxy(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('allows guest access to /arena/join and /arena/play without authentication', () => {
    const joinReq = new NextRequest('http://localhost:3000/arena/join');
    const joinRes = proxy(joinReq);
    expect(joinRes.status).toBe(200);
    expect(joinRes.headers.get('location')).toBeNull();

    const playReq = new NextRequest('http://localhost:3000/arena/play');
    const playRes = proxy(playReq);
    expect(playRes.status).toBe(200);
    expect(playRes.headers.get('location')).toBeNull();
  });

  it('redirects unauthenticated users on /arena/host to /login with returnUrl', () => {
    const req = new NextRequest('http://localhost:3000/arena/host');
    const res = proxy(req);
    expect(res.status).toBe(307);
    const location = res.headers.get('location');
    expect(location).toContain('/login?returnUrl=%2Farena%2Fhost');
  });

  it('allows access in demo mode regardless of token', () => {
    const prev = process.env.NEXT_PUBLIC_DEMO_MODE;
    process.env.NEXT_PUBLIC_DEMO_MODE = 'true';
    try {
      const req = new NextRequest('http://localhost:3000/arena/host');
      const res = proxy(req);
      expect(res.status).toBe(200);
      expect(res.headers.get('location')).toBeNull();
    } finally {
      process.env.NEXT_PUBLIC_DEMO_MODE = prev;
    }
  });
});
