import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '4px solid rgba(88, 204, 2, 0.2)',
          borderTopColor: 'var(--duo-green)',
        }}
        className="animate-spin"
      />
      <span
        style={{
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--text-secondary)',
          letterSpacing: '0.05em',
        }}
      >
        LOADING QUEST...
      </span>
    </div>
  );
}
