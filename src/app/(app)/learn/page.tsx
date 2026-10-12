'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Play, Gamepad2 } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { CurriculumPath } from '@/features/learn/components/curriculum-path';
import { useAudioStore } from '@/stores/audio.store';
import { SAMPLE_JAPANESE_COURSE } from '@/mock/sample-courses';
import { getCompletedLessons } from '@/mock/mock-handler';

export default function LearnPage() {
  const playPop = useAudioStore((s) => s.playPop);
  const [completedLessonIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['lesson-1'];
    return getCompletedLessons();
  });

  // Determine active lesson to recommend
  const allLessons = SAMPLE_JAPANESE_COURSE.units.flatMap((u) => u.lessons);
  const nextActive = allLessons.find((l) => !completedLessonIds.includes(l.id)) || allLessons[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Course Overview Banner */}
      <Card
        padding="lg"
        glow="duo"
        style={{
          background: 'linear-gradient(135deg, rgba(88, 204, 2, 0.15) 0%, rgba(23, 32, 54, 0.9) 100%)',
          borderColor: 'rgba(88, 204, 2, 0.35)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <Badge variant="duo" size="sm" icon={<Sparkles size={14} />}>
              ACTIVE COURSE • FOUNDATIONS
            </Badge>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
              {SAMPLE_JAPANESE_COURSE.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem', maxWidth: '580px', lineHeight: 1.5 }}>
              {SAMPLE_JAPANESE_COURSE.description}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/arena/join" onClick={playPop}>
              <Button variant="kahoot" size="md" leftIcon={<Gamepad2 size={18} />}>
                Join Arena Battle
              </Button>
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href={`/lesson/${SAMPLE_JAPANESE_COURSE.slug}/${nextActive.id}`} onClick={playPop}>
            <Button
              variant="duo"
              size="lg"
              leftIcon={<Play size={20} />}
            >
              Continue: {nextActive.title} (+{nextActive.xpReward} XP)
            </Button>
          </Link>
        </div>
      </Card>

      {/* Dynamic Meandering Curriculum Skill Tree */}
      <CurriculumPath
        course={SAMPLE_JAPANESE_COURSE}
        completedLessonIds={completedLessonIds}
      />
    </div>
  );
}
