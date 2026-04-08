export const mockUsers = [
  {
    userId: "u1-uuid-1234-5678",
    username: "john_doe",
    email: "john@example.com",
    displayName: "John Doe",
    bio: "Passionate learner and flashcard enthusiast.",
    profilePictureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    role: "ROLE_STUDENT",
    status: "ACTIVE",
    createdAt: "2023-01-01T10:00:00Z"
  },
  {
    userId: "u2-uuid-8765-4321",
    username: "jane_teacher",
    email: "jane@example.com",
    displayName: "Jane Smith",
    bio: "Teaching biology for 10 years.",
    profilePictureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    role: "ROLE_TEACHER",
    status: "ACTIVE",
    createdAt: "2023-02-15T09:30:00Z"
  },
  {
    userId: "u3-uuid-admin-9999",
    username: "admin_user",
    email: "admin@kuizu.com",
    displayName: "System Admin",
    bio: "Managing Kuizu platform.",
    profilePictureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    role: "ROLE_ADMIN",
    status: "ACTIVE",
    createdAt: "2022-12-01T00:00:00Z"
  },
  {
    userId: "u4-uuid",
    username: "bob_student",
    displayName: "Bob Wilson",
    role: "ROLE_STUDENT",
    status: "ACTIVE",
    profilePictureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
  },
  {
    userId: "u5-uuid",
    username: "alice_wunder",
    displayName: "Alice Wonderland",
    role: "ROLE_STUDENT",
    status: "ACTIVE",
    profilePictureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
  }
];

export const mockFlashcardSets = [
  {
    setId: 1,
    owner: mockUsers[1],
    title: "Basic Biology",
    description: "Fundamentals of biology for beginners.",
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Science",
    version: 1,
    createdAt: "2023-03-01T12:00:00Z",
    updatedAt: "2023-03-05T14:30:00Z"
  },
  {
    setId: 2,
    owner: mockUsers[0],
    title: "React Hooks Deep Dive",
    description: "Learn about useState, useEffect, and more.",
    visibility: "PRIVATE",
    status: "APPROVED",
    category: "Computer Science",
    version: 1,
    createdAt: "2023-04-10T10:00:00Z",
    updatedAt: "2023-04-10T10:00:00Z"
  },
  {
    setId: 3,
    owner: mockUsers[1],
    title: "World History: 20th Century",
    description: "Major events of the 1900s.",
    visibility: "PUBLIC",
    status: "PENDING",
    category: "History",
    version: 1,
    createdAt: "2023-05-20T08:00:00Z",
    updatedAt: "2023-05-20T08:00:00Z"
  },
  {
    setId: 4,
    owner: mockUsers[1],
    title: "Advanced Organic Chemistry",
    description: "Complex reactions and mechanisms.",
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Science",
    version: 2,
    createdAt: "2023-06-01T10:00:00Z"
  },
  {
    setId: 5,
    owner: mockUsers[0],
    title: "JLPT N5 Vocabulary",
    description: "Basic Japanese words for the N5 exam.",
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Languages",
    version: 1,
    createdAt: "2023-07-01T09:00:00Z"
  },
  {
    setId: 6,
    owner: mockUsers[1],
    title: "European Capitals",
    description: "Quick quiz on capital cities in Europe.",
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Geography",
    version: 1,
    createdAt: "2023-08-01T11:00:00Z"
  },
  {
    setId: 7,
    owner: mockUsers[0],
    title: "Calculus I: Derivatives",
    description: "Common derivative rules and practice.",
    visibility: "PRIVATE",
    status: "APPROVED",
    category: "Mathematics",
    version: 1,
    createdAt: "2023-09-01T14:00:00Z"
  },
  {
    setId: 8,
    owner: mockUsers[2],
    title: "UI Design Principles",
    description: "Typography, color theory, and layout.",
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Design",
    version: 1,
    createdAt: "2023-10-01T16:00:00Z"
  },
  {
    setId: 9,
    owner: mockUsers[1],
    title: "Physics: Thermodynamics",
    description: "Laws of thermodynamics and entropy.",
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Science",
    version: 1,
    createdAt: "2023-11-01T13:00:00Z"
  },
  {
    setId: 10,
    owner: mockUsers[0],
    title: "Modern Economics",
    description: "Supply, demand, and market equilibrium.",
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Social Science",
    version: 1,
    createdAt: "2023-12-01T10:00:00Z"
  }
];

export const mockFlashcards = [
  // Set 1: Biology
  { cardId: 101, setId: 1, term: "Mitochondria", definition: "The powerhouse of the cell.", orderIndex: 0, isDeleted: false },
  { cardId: 102, setId: 1, term: "Photosynthesis", definition: "Process by which plants make food.", orderIndex: 1, isDeleted: false },
  { cardId: 103, setId: 1, term: "Ribosome", definition: "Site of protein synthesis.", orderIndex: 2, isDeleted: false },
  { cardId: 104, setId: 1, term: "Nucleus", definition: "Contains genetic material.", orderIndex: 3, isDeleted: false },

  // Set 2: React
  { cardId: 201, setId: 2, term: "useState", definition: "Hook for state management in functional components.", orderIndex: 0, isDeleted: false },
  { cardId: 202, setId: 2, term: "useEffect", definition: "Hook for side effects in functional components.", orderIndex: 1, isDeleted: false },
  { cardId: 203, setId: 2, term: "useContext", definition: "Hook for consuming context values.", orderIndex: 2, isDeleted: false },

  // Set 5: Japanese
  { cardId: 501, setId: 5, term: "Neko", definition: "Cat (猫)", orderIndex: 0, isDeleted: false },
  { cardId: 502, setId: 5, term: "Inu", definition: "Dog (犬)", orderIndex: 1, isDeleted: false },
  { cardId: 503, setId: 5, term: "Mizu", definition: "Water (水)", orderIndex: 2, isDeleted: false },

  // Set 6: Capitals
  { cardId: 601, setId: 6, term: "France", definition: "Paris", orderIndex: 0, isDeleted: false },
  { cardId: 602, setId: 6, term: "Germany", definition: "Berlin", orderIndex: 1, isDeleted: false },
  { cardId: 603, setId: 6, term: "Italy", definition: "Rome", orderIndex: 2, isDeleted: false }
];

export const mockFolders = [
  { folderId: 1, owner: mockUsers[0], name: "Computer Science", description: "CS resources", visibility: "PRIVATE", isDeleted: false, categories: ["Programming"], createdAt: "2023-04-15" },
  { folderId: 2, owner: mockUsers[1], name: "Medical Studies", description: "Health and medicine", visibility: "PUBLIC", isDeleted: false, categories: ["Medicine"], createdAt: "2023-05-15" },
  { folderId: 3, owner: mockUsers[0], name: "Language Learning", description: "All my languages", visibility: "PRIVATE", isDeleted: false, categories: ["Language"], createdAt: "2023-06-15" },
  { folderId: 4, owner: mockUsers[1], name: "General Science", description: "Physics, Chem, Bio", visibility: "PUBLIC", isDeleted: false, categories: ["Science"], createdAt: "2023-07-15" },
  { folderId: 5, owner: mockUsers[0], name: "Mathematics", description: "Calculus and Algebra", visibility: "PRIVATE", isDeleted: false, categories: ["Math"], createdAt: "2023-08-15" },
  { folderId: 6, owner: mockUsers[2], name: "Design Resources", description: "UI/UX", visibility: "PUBLIC", isDeleted: false, categories: ["Design"], createdAt: "2023-09-15" },
  { folderId: 7, owner: mockUsers[1], name: "History Prep", description: "Exam prep", visibility: "PUBLIC", isDeleted: false, categories: ["History"], createdAt: "2023-10-15" },
  { folderId: 8, owner: mockUsers[0], name: "Economics", description: "Macro and Micro", visibility: "PRIVATE", isDeleted: false, categories: ["Finance"], createdAt: "2023-11-15" },
  { folderId: 9, owner: mockUsers[1], name: "Travel Info", description: "Capitals and Culture", visibility: "PUBLIC", isDeleted: false, categories: ["Geography"], createdAt: "2023-12-15" },
  { folderId: 10, owner: mockUsers[2], name: "Admin Tools", description: "System guides", visibility: "PRIVATE", isDeleted: false, categories: ["Admin"], createdAt: "2024-01-15" }
];

export const mockClasses = [
  { classId: 1, owner: mockUsers[1], className: "Biology 101", description: "Intro to Biology", joinCode: "BIO-101", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-08-01" },
  { classId: 2, owner: mockUsers[1], className: "React Workshop", description: "Hands-on React", joinCode: "REACT-W", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-08-10" },
  { classId: 3, owner: mockUsers[2], className: "System Admin Training", description: "Kuizu Admin", joinCode: "ADM-99", visibility: "PRIVATE", status: "APPROVED", createdAt: "2023-08-15" },
  { classId: 4, owner: mockUsers[1], className: "Physics Honors", description: "Adv Physics", joinCode: "PHY-HONOR", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-01" },
  { classId: 5, owner: mockUsers[1], className: "Calculus Lab", description: "Math practice", joinCode: "MATH-LAB", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-05" },
  { classId: 6, owner: mockUsers[1], className: "Japanese Basic", description: "N5 Level", joinCode: "JPN-N5", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-10" },
  { classId: 7, owner: mockUsers[1], className: "World History Seminar", description: "Discussion", joinCode: "HIST-SEM", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-15" },
  { classId: 8, owner: mockUsers[1], className: "Design Bootcamp", description: "Intensive", joinCode: "UX-CAMP", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-20" },
  { classId: 9, owner: mockUsers[2], className: "Platform Moderation", description: "For Mods", joinCode: "MOD-KU", visibility: "PRIVATE", status: "APPROVED", createdAt: "2023-09-25" },
  { classId: 10, owner: mockUsers[1], className: "Economics Advanced", description: "PhD Prep", joinCode: "ECON-ADV", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-10-01" }
];

// Mapping folders to sets
export const mockFolderSets = [
  { folderId: 1, setId: 2 },
  { folderId: 3, setId: 5 },
  { folderId: 4, setId: 1 },
  { folderId: 4, setId: 4 },
  { folderId: 4, setId: 9 }
];

// Mapping classes to members
export const mockClassMembers = [
  { classId: 1, user: mockUsers[0], role: "STUDENT" },
  { classId: 1, user: mockUsers[3], role: "STUDENT" },
  { classId: 1, user: mockUsers[4], role: "STUDENT" },
  { classId: 2, user: mockUsers[0], role: "STUDENT" },
  { classId: 2, user: mockUsers[3], role: "STUDENT" }
];

export const mockNotifications = [
  { notificationId: 1, recipient: mockUsers[0], type: "CLASS_INVITE", message: "You have been invited to Biology 101", isRead: false, createdAt: "2023-08-05T10:00:00Z" }
];

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
