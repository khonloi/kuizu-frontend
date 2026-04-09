import { mockUsers } from './users';

export const mockModerationHistory = [
  { modId: 1, moderator: mockUsers[2], entityType: "FLASHCARD_SET", entityId: "1", action: "APPROVE", notes: "Content is appropriate.", createdAt: "2023-03-05T14:30:00Z" }
];

export const mockStatistics = {
  totalUsers: 1500,
  totalSets: 450,
  totalClasses: 120,
  userStats: [
    { date: "2023-08-01", count: 1200 },
    { date: "2023-08-02", count: 1250 },
    { date: "2023-08-03", count: 1300 },
    { date: "2023-08-04", count: 1450 },
    { date: "2023-08-05", count: 1500 }
  ]
};

export const mockUserStatistics = [
  { userId: "u1-uuid-1234-5678", totalSets: 12, totalCards: 450, quizzesTaken: 25, avgScore: 88.5, lastActiveAt: "2024-04-08T15:00:00Z" }
];
