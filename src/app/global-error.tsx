'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            textAlign: 'center',
            padding: '2.5rem',
            backgroundColor: 'rgba(23, 32, 54, 0.95)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>💔</div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginBottom: '0.75rem' }}>
            Critical App Encounter
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            {error.message || 'The application encountered a critical exception.'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '0.9rem 2rem',
              borderRadius: '16px',
              backgroundColor: '#58cc02',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 0 #46a302',
            }}
          >
            Restart Application
          </button>
        </div>
      </body>
    </html>
  );
}
