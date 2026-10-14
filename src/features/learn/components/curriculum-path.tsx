"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { BookOpen, CheckCircle2, Lock, Sparkles } from "lucide-react";
import styles from "./curriculum-path.module.css";
import { Badge, Card, ProgressBar } from "@/components/ui";
import { useAudioStore } from "@/stores/audio.store";
import type { Course, Unit, Lesson } from "@/types/api.types";

interface CurriculumPathProps {
  course: Course;
  completedLessonIds: string[];
}

const OFFSETS = [0, 52, 70, 42, -42, -70, -52];

export function CurriculumPath({
  course,
  completedLessonIds,
}: CurriculumPathProps) {
  const playPop = useAudioStore((s) => s.playPop);

  return (
    <div className={styles.pathContainer}>
      {course.units.map((unit: Unit, unitIdx: number) => {
        // Calculate unit progress
        const unitLessons = unit.lessons || [];
        const completedCount = unitLessons.filter((l) =>
          completedLessonIds.includes(l.id),
        ).length;
        const totalCount = unitLessons.length;
        const progressPercent =
          totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        const isUnitCompleted = completedCount === totalCount && totalCount > 0;

        const themeIndex = (unitIdx % 3) + 1;

        return (
          <section key={unit.id} className={styles.unitSection}>
            {/* Unit Banner */}
            <Card
              padding="lg"
              className={clsx(styles.unitCard, styles[`unitTheme${themeIndex}`])}
            >
              <div className={styles.unitHeader}>
                <div>
                  <Badge variant="duo" size="sm" icon={<Sparkles size={14} />} className={styles.unitBadge}>
                    UNIT {unit.order || unitIdx + 1}
                  </Badge>
                  <h2 className={styles.unitTitle}>{unit.title}</h2>
                  {unit.description && (
                    <p className={styles.unitDescription}>{unit.description}</p>
                  )}
                </div>

                <div className={styles.unitProgress}>
                  <span className={styles.unitProgressText}>
                    {completedCount} / {totalCount} Done
                  </span>
                </div>
              </div>

              <div className={styles.unitProgressBarWrapper}>
                <ProgressBar
                  value={progressPercent}
                  max={100}
                  color="yellow"
                  size="sm"
                />
              </div>
            </Card>

            {/* Stepping Stones Meandering Flow */}
            <div className={styles.nodesFlow}>
              {unitLessons.map((lesson: Lesson, lessonIdx: number) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                // Active if previous is completed (or it's the very first lesson) and not yet completed itself
                const prevLesson = unitLessons[lessonIdx - 1];
                const isPrevCompleted =
                  !prevLesson || completedLessonIds.includes(prevLesson.id);
                const isActive = !isCompleted && isPrevCompleted;
                const isLocked = !isCompleted && !isActive;

                const offsetX = OFFSETS[lessonIdx % OFFSETS.length];

                return (
                  <div
                    key={lesson.id}
                    className={styles.nodeWrapper}
                    style={{ transform: `translateX(${offsetX}px)` }}
                  >
                    {/* Active Floating START Badge */}
                    {isActive && (
                      <div className={styles.floatingTooltip} role="status">
                        START
                      </div>
                    )}

                    {/* 1. Completed Node */}
                    {isCompleted && (
                      <Link
                        href={`/lesson/${course.slug}/${lesson.id}`}
                        onClick={playPop}
                        className={clsx(
                          styles.nodeCircle,
                          styles.nodeCompleted,
                        )}
                        title={`${lesson.title} (Practice Again)`}
                        aria-label={`Practice ${lesson.title} again, completed`}
                      >
                        <span className={styles.crownBadge} aria-hidden="true">
                          👑
                        </span>
                        <CheckCircle2 size={36} color="#ffffff" />
                      </Link>
                    )}

                    {/* 2. Active Current Node */}
                    {isActive && (
                      <Link
                        href={`/lesson/${course.slug}/${lesson.id}`}
                        onClick={playPop}
                        className={clsx(
                          styles.nodeCircle,
                          styles.nodeActive,
                          "animate-pulse-ring",
                        )}
                        title={`${lesson.title} (Ready to Start)`}
                        aria-label={`Start ${lesson.title}`}
                      >
                        <BookOpen size={38} color="#ffffff" />
                      </Link>
                    )}

                    {/* 3. Locked Node */}
                    {isLocked && (
                      <div
                        className={clsx(styles.nodeCircle, styles.nodeLocked)}
                        title={`${lesson.title} (Complete previous lesson first)`}
                        aria-label={`${lesson.title} is locked`}
                      >
                        <Lock size={28} color="var(--text-muted)" />
                      </div>
                    )}

                    {/* Lesson Label */}
                    <span
                      className={clsx(styles.lessonLabel, {
                        [styles.lessonLabelLocked]: isLocked,
                      })}
                    >
                      {lessonIdx + 1}. {lesson.title}
                    </span>
                  </div>
                );
              })}

              {/* Unit Completion Milestone Chest */}
              <div className={styles.milestoneChest}>
                <div className={styles.milestoneEmoji}>
                  {isUnitCompleted ? "🏆" : "🎁"}
                </div>
                <div className={styles.milestoneInfo}>
                  <span className={styles.milestoneTitle}>
                    {isUnitCompleted ? "Unit Mastered!" : "Unit Reward Chest"}
                  </span>
                  <span className={styles.milestoneSubtitle}>
                    {isUnitCompleted
                      ? "+50 Bonus Gems Claimed"
                      : "Complete all lessons to unlock"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
