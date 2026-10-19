'use client';

import React from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';
import { Card, Button, Avatar, Badge } from '@/components/ui';
import type { User } from '@/types/api.types';
import styles from '../profile.module.css';

interface ProfileHeaderProps {
  user: User;
  onLogout: () => void;
}

export function ProfileHeader({ user, onLogout }: ProfileHeaderProps) {
  return (
    <Card padding="lg" className={styles.headerCard} data-testid="profile-header-card">
      <div className={styles.userInfo}>
        <Avatar name={user.username} src={user.avatarUrl} size="lg" ring="gold" />
        <div>
          <div className={styles.userHeading}>
            <h1 className={styles.userName}>{user.username}</h1>
            <Badge variant="duo" size="sm" icon={<ShieldCheck size={14} />}>
              {user.role}
            </Badge>
          </div>
          {user.email && <p className={styles.userEmail}>{user.email}</p>}
        </div>
      </div>

      <Button
        variant="danger"
        size="sm"
        onClick={onLogout}
        leftIcon={<LogOut size={16} />}
      >
        Sign Out
      </Button>
    </Card>
  );
}
