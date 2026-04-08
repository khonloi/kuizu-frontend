import { 
  mockUsers, 
  mockFlashcardSets, 
  mockFlashcards, 
  mockFolders, 
  mockClasses, 
  mockNotifications,
  mockFolderSets,
  mockClassMembers 
} from './mockData';

export const mockApi = {
  // Auth
  login: async (usernameOrEmail, password) => {
    const user = mockUsers.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);
    if (user) return { token: "mock-token-" + user.userId, user };
    throw { response: { status: 401, data: { message: "Invalid credentials" } } };
  },
  register: async (userData) => { return { message: "Success", user: { ...userData, userId: "new-user-id" } }; },

  // Flashcards
  getPublicFlashcardSets: async () => { 
    return mockFlashcardSets.filter(s => s.visibility === "PUBLIC").map(s => ({ ...s, name: s.title })); 
  },
  getMyFlashcardSets: async (userId = "u1-uuid-1234-5678") => { 
    return mockFlashcardSets.filter(s => s.owner.userId === userId).map(s => ({ ...s, name: s.title })); 
  },
  getFlashcardSetById: async (setId) => { 
    const set = mockFlashcardSets.find(s => s.setId === parseInt(setId));
    if (!set) return null;
    return { 
      ...set, 
      ownerId: set.owner.userId, 
      ownerUserId: set.owner.userId, 
      ownerUsername: set.owner.username 
    }; 
  },
  getFlashcardsBySetId: async (setId) => { return mockFlashcards.filter(c => c.setId === parseInt(setId)); },
  createFlashcardSet: async (data) => { return { ...data, setId: Math.floor(Math.random() * 1000) }; },

  // Folders
  getMyFolders: async (userId = "u1-uuid-1234-5678") => { 
    return mockFolders.filter(f => f.owner.userId === userId).map(f => ({ ...f, title: f.name })); 
  },
  getPublicFolders: async () => {
    return mockFolders.filter(f => f.visibility === "PUBLIC").map(f => ({ ...f, title: f.name }));
  },
  getFolderDetail: async (folderId) => { 
    const folder = mockFolders.find(f => f.folderId === parseInt(folderId));
    if (!folder) return null;
    const setIds = mockFolderSets.filter(fs => fs.folderId === folder.folderId).map(fs => fs.setId);
    const sets = mockFlashcardSets.filter(s => setIds.includes(s.setId));
    return { 
      ...folder, 
      sets,
      ownerId: folder.owner.userId,
      ownerUserId: folder.owner.userId,
      ownerUsername: folder.owner.username
    };
  },
  createFolder: async (data) => { return { ...data, folderId: Math.floor(Math.random() * 1000) }; },

  // Classes
  getMyClasses: async (userId = "u1-uuid-1234-5678") => { 
    // Classes owned or member of
    const owned = mockClasses.filter(c => c.owner.userId === userId);
    const memberOfIds = mockClassMembers.filter(cm => cm.user.userId === userId).map(cm => cm.classId);
    const memberOf = mockClasses.filter(c => memberOfIds.includes(c.classId));
    return [...new Set([...owned, ...memberOf])].map(c => ({ ...c, title: c.className }));
  },
  getPublicClasses: async () => {
    return mockClasses.filter(c => c.visibility === "PUBLIC").map(c => ({ ...c, title: c.className }));
  },
  getClassDetails: async (classId) => {
    const clazz = mockClasses.find(c => c.classId === parseInt(classId));
    if (!clazz) return null;
    const members = mockClassMembers.filter(cm => cm.classId === clazz.classId).map(cm => ({
        ...cm.user,
        role: cm.role
    }));
    
    // Mock materials for class 1
    const classMaterials = clazz.classId === 1 ? [
        { materialId: 1001, materialType: 'SET', materialRefId: 1, materialName: "Basic Biology" },
        { materialId: 1002, materialType: 'FOLDER', materialRefId: 4, materialName: "General Science" }
    ] : [];

    return { 
        ...clazz, 
        members, 
        classMaterials, 
        ownerId: clazz.owner.userId,
        ownerUserId: clazz.owner.userId,
        ownerUsername: clazz.owner.username,
        joinRequests: clazz.classId === 1 ? [
            { requestId: 501, userId: "u4-uuid", displayName: "Bob Wilson", message: "Please let me in!" }
        ] : [] 
    };
  },
  joinClass: async (classId, { joinCode }) => {
    const clazz = mockClasses.find(c => c.classId === parseInt(classId));
    if (clazz && clazz.joinCode === joinCode) return { message: "Joined successfully" };
    throw { response: { status: 400, data: { message: "Invalid join code" } } };
  },

  // Notifications
  getNotifications: async () => { return mockNotifications; },
  markAsRead: async (notifId) => { return { success: true }; },

  // User
  getMyProfile: async () => { return mockUsers[0]; },
  updateProfile: async (data) => { return { ...mockUsers[0], ...data }; },

  // Study
  submitQuiz: async (quizData) => { return { score: 80, correctAnswers: 8, totalQuestions: 10 }; },
  getQuizResults: async (setId) => { return [{ quizId: 1, score: 90, createdAt: "2023-08-01T10:00:00Z" }]; },
  getStudyProgress: async (setId) => { return { learnedCount: 5, totalCount: 10 }; },
  resetStudyProgress: async (setId) => { return { message: "Reset successful" }; },
  updateStudyProgress: async (cardId, isCorrect) => { return { cardId, isCorrect, proficiency: 0.5 }; }
};

export default mockApi;
