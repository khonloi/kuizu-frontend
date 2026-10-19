import React from 'react';
import { Card, Skeleton } from '@/components/ui';

export default function AppLoading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      {/* Banner Skeleton */}
      <Card padding="lg">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton variant="rect" width="160px" height="28px" />
          <Skeleton variant="text" width="60%" height="32px" />
          <Skeleton variant="text" width="85%" height="20px" />
          <div style={{ marginTop: '0.75rem' }}>
            <Skeleton variant="rect" width="220px" height="48px" />
          </div>
        </div>
      </Card>

      {/* Content Grid Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <Card padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton variant="circle" width="56px" height="56px" />
            <Skeleton variant="text" width="70%" height="24px" />
            <Skeleton variant="text" width="95%" height="18px" />
            <Skeleton variant="rect" width="100%" height="42px" />
          </div>
        </Card>
        <Card padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton variant="circle" width="56px" height="56px" />
            <Skeleton variant="text" width="70%" height="24px" />
            <Skeleton variant="text" width="95%" height="18px" />
            <Skeleton variant="rect" width="100%" height="42px" />
          </div>
        </Card>
        <Card padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton variant="circle" width="56px" height="56px" />
            <Skeleton variant="text" width="70%" height="24px" />
            <Skeleton variant="text" width="95%" height="18px" />
            <Skeleton variant="rect" width="100%" height="42px" />
          </div>
        </Card>
      </div>
    </div>
  );
}
