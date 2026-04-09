export const studyHandlers = {
  submitQuiz: async (quizData) => { return { score: 80, correctAnswers: 8, totalQuestions: 10 }; },
  getQuizResults: async (setId) => { return [{ quizId: 1, score: 90, createdAt: "2023-08-01T10:00:00Z" }]; },
  getStudyProgress: async (setId) => { return { learnedCount: 5, totalCount: 10 }; },
  resetStudyProgress: async (setId) => { return { message: "Reset successful" }; },
  updateStudyProgress: async (cardId, isCorrect) => { return { cardId, isCorrect, proficiency: 0.5 }; }
};
