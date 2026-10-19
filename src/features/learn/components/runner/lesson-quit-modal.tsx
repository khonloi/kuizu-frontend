'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Button } from '@/components/ui';
import styles from '../../lesson-runner.module.css';

interface LessonQuitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LessonQuitModal({ isOpen, onClose }: LessonQuitModalProps) {
  const router = useRouter();

  const handleQuit = () => {
    onClose();
    router.push('/learn');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quit Lesson?"
      footer={
        <div className={styles.modalFooter}>
          <Button variant="ghost" size="md" onClick={onClose}>
            Keep Learning
          </Button>
          <Button variant="danger" size="md" onClick={handleQuit}>
            Quit Now
          </Button>
        </div>
      }
    >
      <p className={styles.modalBodyText}>
        Are you sure you want to exit? Your progress in this lesson session will be lost and no XP will be awarded.
      </p>
    </Modal>
  );
}
