export interface MockQuizChoice {
  id: string;
  text: string;
  color: 'red' | 'blue' | 'yellow' | 'green';
  isCorrect?: boolean;
}

export interface MockQuizQuestion {
  id: string;
  questionText: string;
  timeLimit: number;
  points: number;
  mediaUrl?: string;
  choices: MockQuizChoice[];
}

export interface MockQuiz {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  questions: MockQuizQuestion[];
}

export const SAMPLE_QUIZZES: MockQuiz[] = [
  {
    id: 'quiz-anime-pop',
    title: '🎌 Ultimate Japanese Pop & Anime Trivia',
    description: 'Test your knowledge on legendary series, Studio Ghibli, and iconic characters!',
    category: 'Pop Culture',
    icon: '⚡',
    questions: [
      {
        id: 'q1',
        questionText: 'What is the name of Goku’s signature finishing move taught by Master Roshi?',
        timeLimit: 20,
        points: 1000,
        choices: [
          { id: 'q1-c1', text: 'Kamehameha', color: 'red', isCorrect: true },
          { id: 'q1-c2', text: 'Rasengan', color: 'blue' },
          { id: 'q1-c3', text: 'Spirit Gun', color: 'yellow' },
          { id: 'q1-c4', text: 'Getsuga Tensho', color: 'green' },
        ],
      },
      {
        id: 'q2',
        questionText: 'Which Studio Ghibli film features a soot sprite named Susuwatari and a giant forest spirit?',
        timeLimit: 15,
        points: 1000,
        choices: [
          { id: 'q2-c1', text: 'Princess Mononoke', color: 'red' },
          { id: 'q2-c2', text: 'My Neighbor Totoro', color: 'blue', isCorrect: true },
          { id: 'q2-c3', text: 'Howl\'s Moving Castle', color: 'yellow' },
          { id: 'q2-c4', text: 'Ponyo', color: 'green' },
        ],
      },
      {
        id: 'q3',
        questionText: 'In "One Piece", what is Luffy’s dream destination to become the King of the Pirates?',
        timeLimit: 15,
        points: 1000,
        choices: [
          { id: 'q3-c1', text: 'Laugh Tale (Raftel)', color: 'red', isCorrect: true },
          { id: 'q3-c2', text: 'Marineford', color: 'blue' },
          { id: 'q3-c3', text: 'Wano Country', color: 'yellow' },
          { id: 'q3-c4', text: 'Fishman Island', color: 'green' },
        ],
      },
      {
        id: 'q4',
        questionText: 'What mythical animal serves as Tanjiro’s primary breathing style in early Demon Slayer?',
        timeLimit: 15,
        points: 1000,
        choices: [
          { id: 'q4-c1', text: 'Flame / Phoenix', color: 'red' },
          { id: 'q4-c2', text: 'Thunder / Tiger', color: 'blue' },
          { id: 'q4-c3', text: 'Water Breathing (Mizu)', color: 'yellow', isCorrect: true },
          { id: 'q4-c4', text: 'Beast / Boar', color: 'green' },
        ],
      },
      {
        id: 'q5',
        questionText: 'Which anime series features a high-stakes psychological game involving the Death Note notebook?',
        timeLimit: 15,
        points: 1000,
        choices: [
          { id: 'q5-c1', text: 'Code Geass', color: 'red' },
          { id: 'q5-c2', text: 'Monster', color: 'blue' },
          { id: 'q5-c3', text: 'Steins;Gate', color: 'yellow' },
          { id: 'q5-c4', text: 'Death Note', color: 'green', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: 'quiz-web-dev',
    title: '💻 Web Dev & Frontend Engineering',
    description: 'React, Next.js, TypeScript, and modern browser APIs challenge.',
    category: 'Technology',
    icon: '🚀',
    questions: [
      {
        id: 'w1',
        questionText: 'Which HTTP status code signifies "401 Unauthorized" vs "403 Forbidden"?',
        timeLimit: 15,
        points: 1000,
        choices: [
          { id: 'w1-c1', text: '401 is missing credentials, 403 is lacking permissions', color: 'red', isCorrect: true },
          { id: 'w1-c2', text: 'Both mean exactly the same', color: 'blue' },
          { id: 'w1-c3', text: '401 is server error, 403 is client error', color: 'yellow' },
          { id: 'w1-c4', text: '403 requires password reset', color: 'green' },
        ],
      },
      {
        id: 'w2',
        questionText: 'Which Web API provides zero-latency synthetic audio without downloading MP3 audio files?',
        timeLimit: 15,
        points: 1000,
        choices: [
          { id: 'w2-c1', text: 'WebRTC Audio', color: 'red' },
          { id: 'w2-c2', text: 'Web Audio API (AudioContext)', color: 'blue', isCorrect: true },
          { id: 'w2-c3', text: 'MediaSource Extensions', color: 'yellow' },
          { id: 'w2-c4', text: 'HTML5 <audio> tag', color: 'green' },
        ],
      },
      {
        id: 'w3',
        questionText: 'What is the default port for Redis servers?',
        timeLimit: 15,
        points: 1000,
        choices: [
          { id: 'w3-c1', text: '6379', color: 'red', isCorrect: true },
          { id: 'w3-c2', text: '27017', color: 'blue' },
          { id: 'w3-c3', text: '5432', color: 'yellow' },
          { id: 'w3-c4', text: '3000', color: 'green' },
        ],
      },
    ],
  },
];
