import type { Course, Lesson } from "@/types/api.types";

export const SAMPLE_CHINESE_COURSE: Course = {
  id: "course-chinese-1",
  title: "Chinese Foundations (Mandarin)",
  slug: "chinese-foundations",
  description:
    "Master Mandarin essentials: Pinyin, the 4 tones, daily greetings, self-introductions, numbers 1-10, and dining phrases.",
  icon: "🇨🇳",
  isPublished: true,
  units: [
    {
      id: "unit-cn-1",
      title: "Unit 1: Pinyin & Essential Greetings",
      description: "Master Pinyin, the four tones, basic greetings, and polite introductions.",
      color: "#e53e3e",
      order: 1,
      lessons: [
        {
          id: "lesson-cn-1",
          title: "Basic Greetings & Politeness",
          icon: "sun",
          order: 1,
          xpReward: 20,
          exercises: [
            {
              id: "ex-cn-1-1",
              type: "multiple-choice",
              prompt: 'How do you say "Hello" in Mandarin Chinese?',
              options: [
                "Nǐ hǎo (你好)",
                "Xièxie (谢谢)",
                "Zàijiàn (再见)",
                "Duìbuqǐ (对不起)",
              ],
              answer: "Nǐ hǎo (你好)",
              hint: 'Literally translates to "You good".',
            },
            {
              id: "ex-cn-1-2",
              type: "translate",
              prompt: 'Translate into Mandarin: "Thank you"',
              options: ["Xièxie", "Nǐ hǎo", "Bú kèqi", "Zàijiàn", "Hǎo"],
              answer: "Xièxie",
              hint: "Said twice quickly: xiè-xie (谢谢).",
            },
            {
              id: "ex-cn-1-3",
              type: "fill-blank",
              prompt: 'Complete the polite reply: "Bú _____ (You are welcome / Do not be polite)"',
              options: ["kèqi (客气)", "hǎo (好)", "xiè (谢)", "máng (忙)"],
              answer: "kèqi (客气)",
              hint: 'Literally means "No politeness needed".',
            },
            {
              id: "ex-cn-1-4",
              type: "multiple-choice",
              prompt: 'Which tone is used for "Mā" (Mother, 妈)?',
              options: [
                "First tone (high level ¯)",
                "Second tone (rising ˊ)",
                "Third tone (dipping ˇ)",
                "Fourth tone (falling ˋ)",
              ],
              answer: "First tone (high level ¯)",
              hint: "A steady, high-pitched continuous sound.",
            },
            {
              id: "ex-cn-1-5",
              type: "match-pairs",
              prompt: "Match Chinese greetings with their English meanings",
              options: [
                "Nǐ hǎo : Hello",
                "Xièxie : Thank you",
                "Zàijiàn : Goodbye",
                "Duìbuqǐ : Sorry",
              ],
              answer: "all_matched",
              hint: "Tap a Chinese expression and its English counterpart.",
            },
            {
              id: "ex-cn-1-6",
              type: "listen",
              prompt: "Nǐ hǎo",
              options: ["Nǐ hǎo", "Xièxie", "Zàijiàn", "Duìbuqǐ"],
              answer: "Nǐ hǎo",
              hint: "Listen to the audio pronunciation.",
            },
          ],
        },
        {
          id: "lesson-cn-2",
          title: "Self-Introductions & Nationalities",
          icon: "book",
          order: 2,
          xpReward: 25,
          exercises: [
            {
              id: "ex-cn-2-1",
              type: "multiple-choice",
              prompt: 'What does "Wǒ jiào Alex" (我叫 Alex) mean?',
              options: [
                "My name is Alex",
                "I like Alex",
                "Where is Alex?",
                "Alex is my teacher",
              ],
              answer: "My name is Alex",
              hint: 'Verb "jiào" (叫) means "to be called".',
            },
            {
              id: "ex-cn-2-2",
              type: "translate",
              prompt: 'Construct: "I am a student"',
              options: ["Wǒ", "shì", "xuésheng", "lǎoshī", "rén"],
              answer: "Wǒ shì xuésheng",
              hint: '"Wǒ" (I) + "shì" (am) + "xuésheng" (student).',
            },
            {
              id: "ex-cn-2-3",
              type: "fill-blank",
              prompt: '"Wǒ shì _____ rén" (I am Chinese)',
              options: ["Zhōngguó (中国)", "Měiguó (美国)", "Rìběn (日本)", "Yīngguó (英国)"],
              answer: "Zhōngguó (中国)",
              hint: 'Country name for "Middle Kingdom".',
            },
            {
              id: "ex-cn-2-4",
              type: "multiple-choice",
              prompt: 'How do you ask "What is your name?" in Mandarin?',
              options: [
                "Nǐ jiào shénme míngzi? (你叫什么名字？)",
                "Nǐ hǎo ma? (你好吗？)",
                "Nǐ qù nǎr? (你去哪儿？)",
                "Shuí a? (谁啊？)",
              ],
              answer: "Nǐ jiào shénme míngzi? (你叫什么名字？)",
              hint: '"shénme míngzi" means "what name".',
            },
            {
              id: "ex-cn-2-5",
              type: "match-pairs",
              prompt: "Match Chinese pronouns and terms with English",
              options: [
                "Wǒ : I / Me",
                "Nǐ : You",
                "Tā : He / She",
                "Lǎoshī : Teacher",
              ],
              answer: "all_matched",
              hint: "Match the character/pinyin with its meaning.",
            },
          ],
        },
      ],
    },
    {
      id: "unit-cn-2",
      title: "Unit 2: Numbers & Dining Culture",
      description: "Count from 1 to 10, ask prices, and order authentic tea and food.",
      color: "#ff9600",
      order: 2,
      lessons: [
        {
          id: "lesson-cn-3",
          title: "Numbers 1-10 & Prices",
          icon: "star",
          order: 1,
          xpReward: 25,
          exercises: [
            {
              id: "ex-cn-3-1",
              type: "multiple-choice",
              prompt: "What are the characters for numbers 1, 2, 3 in Chinese?",
              options: [
                "一, 二, 三 (Yī, Èr, Sān)",
                "四, 五, 六",
                "七, 八, 九",
                "十, 百, 千",
              ],
              answer: "一, 二, 三 (Yī, Èr, Sān)",
              hint: "Simple horizontal strokes representing the numbers.",
            },
            {
              id: "ex-cn-3-2",
              type: "translate",
              prompt: 'Translate: "How much is this?"',
              options: ["Zhège", "duōshao", "qián", "ma", "shì"],
              answer: "Zhège duōshao qián",
              hint: '"Zhège" (this) + "duōshao qián" (how much money).',
            },
            {
              id: "ex-cn-3-3",
              type: "fill-blank",
              prompt: '"Zhège _____ kuài qián" (This is 10 Yuan)',
              options: ["shí (十)", "yī (一)", "sān (三)", "wǔ (五)"],
              answer: "shí (十)",
              hint: 'Cross-shaped character for ten.',
            },
            {
              id: "ex-cn-3-4",
              type: "match-pairs",
              prompt: "Match Chinese numbers with Arabic digits",
              options: [
                "一 (Yī) : 1",
                "五 (Wǔ) : 5",
                "八 (Bā) : 8",
                "十 (Shí) : 10",
              ],
              answer: "all_matched",
              hint: "Match each character with its number.",
            },
          ],
        },
        {
          id: "lesson-cn-4",
          title: "Ordering Food & Tea Culture",
          icon: "coffee",
          order: 2,
          xpReward: 30,
          exercises: [
            {
              id: "ex-cn-4-1",
              type: "translate",
              prompt: 'Construct: "I want a cup of green tea"',
              options: ["Wǒ", "yào", "yī", "bēi", "lǜchá", "shuǐ"],
              answer: "Wǒ yào yī bēi lǜchá",
              hint: '"yī bēi" is the measure phrase for a cup/glass.',
            },
            {
              id: "ex-cn-4-2",
              type: "multiple-choice",
              prompt: 'What does "Hǎochī" (好吃) mean?',
              options: [
                "Delicious / Tasty",
                "Too spicy",
                "Expensive",
                "Not hungry",
              ],
              answer: "Delicious / Tasty",
              hint: 'Literally "Good to eat".',
            },
            {
              id: "ex-cn-4-3",
              type: "fill-blank",
              prompt: '"Fúwùyuán, _____!" (Waiter, check please!)',
              options: ["mǎidān (买单)", "nǐ hǎo (你好)", "xièxie (谢谢)", "zàijiàn (再见)"],
              answer: "mǎidān (买单)",
              hint: 'Common phrase used in Chinese restaurants to ask for the bill.',
            },
            {
              id: "ex-cn-4-4",
              type: "match-pairs",
              prompt: "Match Chinese food vocabulary with English",
              options: [
                "Chá (茶) : Tea",
                "Shuǐjiǎo (水饺) : Dumplings",
                "Miàntiáo (面条) : Noodles",
                "Mǐfàn (米饭) : Rice",
              ],
              answer: "all_matched",
              hint: "Match the food item with its English translation.",
            },
          ],
        },
      ],
    },
  ],
};

export const ALL_SAMPLE_COURSES: Course[] = [
  SAMPLE_CHINESE_COURSE,
];

export function getSampleLesson(
  _courseSlug: string,
  lessonId: string,
): Lesson | null {
  for (const unit of SAMPLE_CHINESE_COURSE.units) {
    const match = unit.lessons.find((l) => l.id === lessonId);
    if (match) return match;
  }

  return SAMPLE_CHINESE_COURSE.units[0].lessons[0];
}
