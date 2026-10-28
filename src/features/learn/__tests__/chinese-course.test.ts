import { describe, it, expect } from 'vitest';
import {
  SAMPLE_CHINESE_COURSE,
  ALL_SAMPLE_COURSES,
  getSampleLesson,
} from '@/mock/sample-courses';

describe('Chinese Foundations Curriculum (sample-courses.ts)', () => {
  it('defines valid Chinese course metadata', () => {
    expect(SAMPLE_CHINESE_COURSE.id).toBe('course-chinese-1');
    expect(SAMPLE_CHINESE_COURSE.slug).toBe('chinese-foundations');
    expect(SAMPLE_CHINESE_COURSE.title).toContain('Chinese Foundations');
    expect(SAMPLE_CHINESE_COURSE.icon).toBe('🇨🇳');
    expect(SAMPLE_CHINESE_COURSE.isPublished).toBe(true);
    expect(SAMPLE_CHINESE_COURSE.units).toHaveLength(2);
  });

  it('contains structured lessons across 2 units', () => {
    const [unit1, unit2] = SAMPLE_CHINESE_COURSE.units;

    expect(unit1.id).toBe('unit-cn-1');
    expect(unit1.lessons).toHaveLength(2);
    expect(unit1.lessons[0].id).toBe('lesson-cn-1');
    expect(unit1.lessons[1].id).toBe('lesson-cn-2');

    expect(unit2.id).toBe('unit-cn-2');
    expect(unit2.lessons).toHaveLength(2);
    expect(unit2.lessons[0].id).toBe('lesson-cn-3');
    expect(unit2.lessons[1].id).toBe('lesson-cn-4');
  });

  it('includes all pedagogical exercise types in Chinese lessons', () => {
    const allExercises = SAMPLE_CHINESE_COURSE.units.flatMap((u) =>
      u.lessons.flatMap((l) => l.exercises),
    );

    const types = new Set(allExercises.map((ex) => ex.type));
    expect(types.has('multiple-choice')).toBe(true);
    expect(types.has('translate')).toBe(true);
    expect(types.has('fill-blank')).toBe(true);
    expect(types.has('match-pairs')).toBe(true);
    expect(types.has('listen')).toBe(true);

    // Verify all exercises have valid answers
    for (const ex of allExercises) {
      expect(ex.id).toBeTruthy();
      expect(ex.prompt).toBeTruthy();
      expect(ex.answer).toBeTruthy();
      expect(ex.options.length).toBeGreaterThan(0);
    }
  });

  it('correctly resolves lessons via getSampleLesson for Chinese lessons', () => {
    const cnLesson1 = getSampleLesson('chinese-foundations', 'lesson-cn-1');
    expect(cnLesson1).not.toBeNull();
    expect(cnLesson1?.id).toBe('lesson-cn-1');
    expect(cnLesson1?.title).toBe('Basic Greetings & Politeness');

    const cnLesson4 = getSampleLesson('chinese-foundations', 'lesson-cn-4');
    expect(cnLesson4).not.toBeNull();
    expect(cnLesson4?.id).toBe('lesson-cn-4');
    expect(cnLesson4?.title).toBe('Ordering Food & Tea Culture');
  });

  it('exposes ALL_SAMPLE_COURSES containing Chinese curriculum', () => {
    expect(ALL_SAMPLE_COURSES).toHaveLength(1);
    const slugs = ALL_SAMPLE_COURSES.map((c) => c.slug);
    expect(slugs).toContain('chinese-foundations');
  });
});
