import type { Course, Lesson } from '../types/api.types';

export const SAMPLE_JAPANESE_COURSE: Course = {
  id: 'course-japanese-1',
  title: 'Japanese Foundations',
  slug: 'japanese-foundations',
  description: 'Master essential greetings, introductions, hiragana basics, and sentence building.',
  icon: '🗾',
  isPublished: true,
  units: [
    {
      id: 'unit-1',
      title: 'Unit 1: Essential Greetings',
      description: 'Learn common daily greetings and how to introduce yourself.',
      color: '#58cc02',
      order: 1,
      lessons: [
        {
          id: 'lesson-1',
          title: 'Daily Greetings',
          icon: 'sun',
          order: 1,
          xpReward: 20,
          exercises: [
            {
              id: 'ex-1-1',
              type: 'multiple-choice',
              prompt: 'How do you say "Good morning" politely in Japanese?',
              options: [
                'Ohayou gozaimasu (おはようございます)',
                'Konnichiwa (こんにちは)',
                'Konbanwa (こんばんは)',
                'Sayounara (さようなら)',
              ],
              answer: 'Ohayou gozaimasu (おはようございます)',
              hint: 'Often used before noon with teachers and colleagues.',
            },
            {
              id: 'ex-1-2',
              type: 'translate',
              prompt: 'Translate into Japanese: "Hello / Good afternoon"',
              options: ['Konnichiwa', 'Arigatou', 'Sayounara', 'Hai', 'Gomen'],
              answer: 'Konnichiwa',
              hint: 'The most famous general greeting.',
            },
            {
              id: 'ex-1-3',
              type: 'fill-blank',
              prompt: 'Complete the sentence: "Arigatou _____ (Thank you very much)"',
              options: ['gozaimasu', 'desu', 'kudasai', 'san'],
              answer: 'gozaimasu',
              hint: 'A polite auxiliary verb added to express deep gratitude.',
            },
            {
              id: 'ex-1-4',
              type: 'multiple-choice',
              prompt: 'What is the standard response to "Arigatou gozaimasu"?',
              options: [
                'Dou itashimashite (You are welcome)',
                'Sayounara (Goodbye)',
                'Oyasumi nasai (Good night)',
                'Ja mata (See you later)',
              ],
              answer: 'Dou itashimashite (You are welcome)',
              hint: 'Means "Do not mention it" or "You are welcome".',
            },
          ],
        },
        {
          id: 'lesson-2',
          title: 'Introductions & Polite Expressions',
          icon: 'book',
          order: 2,
          xpReward: 25,
          exercises: [
            {
              id: 'ex-2-1',
              type: 'multiple-choice',
              prompt: 'What does "Hajimemashite" (初めまして) mean?',
              options: [
                'Nice to meet you (first time)',
                'Goodbye forever',
                'Excuse me',
                'I am hungry',
              ],
              answer: 'Nice to meet you (first time)',
              hint: 'Derived from "hajimeru" (to begin).',
            },
            {
              id: 'ex-2-2',
              type: 'translate',
              prompt: 'Construct: "Nice to meet you"',
              options: ['Hajimemashite', 'Yoroshiku', 'Onegaishimasu', 'Arigatou'],
              answer: 'Hajimemashite',
              hint: 'Said at the very beginning of a self-introduction.',
            },
            {
              id: 'ex-2-3',
              type: 'fill-blank',
              prompt: '"Watashi _____ Tanaka desu" (I am Tanaka)',
              options: ['wa', 'no', 'ga', 'wo'],
              answer: 'wa',
              hint: 'The topic marker particle (written as は).',
            },
          ],
        },
      ],
    },
  ],
};

export function getSampleLesson(courseSlug: string, lessonId: string): Lesson | null {
  if (courseSlug === 'japanese-foundations' || courseSlug === 'default') {
    for (const unit of SAMPLE_JAPANESE_COURSE.units) {
      const match = unit.lessons.find((l) => l.id === lessonId);
      if (match) return match;
    }
  }

  // Fallback default lesson
  return SAMPLE_JAPANESE_COURSE.units[0].lessons[0];
}
