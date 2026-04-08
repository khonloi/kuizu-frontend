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
    ownerDisplayName: "Jane Smith",
    title: "Basic Biology",
    description: "Fundamentals of biology for beginners.",
    cardCount: 10,
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
    ownerDisplayName: "John Doe",
    title: "React Hooks Deep Dive",
    description: "Learn about useState, useEffect, and more.",
    cardCount: 10,
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
    ownerDisplayName: "Jane Smith",
    title: "World History: 20th Century",
    description: "Major events of the 1900s.",
    cardCount: 10,
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
    ownerDisplayName: "Jane Smith",
    title: "Advanced Organic Chemistry",
    description: "Complex reactions and mechanisms.",
    cardCount: 10,
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Science",
    version: 2,
    createdAt: "2023-06-01T10:00:00Z"
  },
  {
    setId: 5,
    owner: mockUsers[0],
    ownerDisplayName: "John Doe",
    title: "JLPT N5 Vocabulary",
    description: "Basic Japanese words for the N5 exam.",
    cardCount: 10,
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Languages",
    version: 1,
    createdAt: "2023-07-01T09:00:00Z"
  },
  {
    setId: 6,
    owner: mockUsers[1],
    ownerDisplayName: "Jane Smith",
    title: "European Capitals",
    description: "Quick quiz on capital cities in Europe.",
    cardCount: 10,
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Geography",
    version: 1,
    createdAt: "2023-08-01T11:00:00Z"
  },
  {
    setId: 7,
    owner: mockUsers[0],
    ownerDisplayName: "John Doe",
    title: "Calculus I: Derivatives",
    description: "Common derivative rules and practice.",
    cardCount: 10,
    visibility: "PRIVATE",
    status: "APPROVED",
    category: "Mathematics",
    version: 1,
    createdAt: "2023-09-01T14:00:00Z"
  },
  {
    setId: 8,
    owner: mockUsers[2],
    ownerDisplayName: "System Admin",
    title: "UI Design Principles",
    description: "Typography, color theory, and layout.",
    cardCount: 10,
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Design",
    version: 1,
    createdAt: "2023-10-01T16:00:00Z"
  },
  {
    setId: 9,
    owner: mockUsers[1],
    ownerDisplayName: "Jane Smith",
    title: "Physics: Thermodynamics",
    description: "Laws of thermodynamics and entropy.",
    cardCount: 10,
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Science",
    version: 1,
    createdAt: "2023-11-01T13:00:00Z"
  },
  {
    setId: 10,
    owner: mockUsers[0],
    ownerDisplayName: "John Doe",
    title: "Modern Economics",
    description: "Supply, demand, and market equilibrium.",
    cardCount: 10,
    visibility: "PUBLIC",
    status: "APPROVED",
    category: "Social Science",
    version: 1,
    createdAt: "2023-12-01T10:00:00Z"
  }
];

export const mockFlashcards = [
  // Set 1: Biology
  { cardId: 101, setId: 1, term: "Mitochondria", definition: "Powerhouse of the cell.", orderIndex: 0, isDeleted: false },
  { cardId: 102, setId: 1, term: "Photosynthesis", definition: "Converting light to chemical energy.", orderIndex: 1, isDeleted: false },
  { cardId: 103, setId: 1, term: "Ribosome", definition: "Site of protein synthesis.", orderIndex: 2, isDeleted: false },
  { cardId: 104, setId: 1, term: "Nucleus", definition: "Control center (contains DNA).", orderIndex: 3, isDeleted: false },
  { cardId: 105, setId: 1, term: "Cytoplasm", definition: "Jelly-like substance within a cell.", orderIndex: 4, isDeleted: false },
  { cardId: 106, setId: 1, term: "Cell Wall", definition: "Rigid outer layer in plant cells.", orderIndex: 5, isDeleted: false },
  { cardId: 107, setId: 1, term: "Chloroplast", definition: "Organelle for photosynthesis in plants.", orderIndex: 6, isDeleted: false },
  { cardId: 108, setId: 1, term: "Vacuole", definition: "Storage area within a cell.", orderIndex: 7, isDeleted: false },
  { cardId: 109, setId: 1, term: "DNA", definition: "Genetic blueprint of life.", orderIndex: 8, isDeleted: false },
  { cardId: 110, setId: 1, term: "RNA", definition: "Molecule that translates DNA into proteins.", orderIndex: 9, isDeleted: false },

  // Set 2: React
  { cardId: 201, setId: 2, term: "useState", definition: "Hook for state management in functional components.", orderIndex: 0, isDeleted: false },
  { cardId: 202, setId: 2, term: "useEffect", definition: "Hook for side effects in functional components.", orderIndex: 1, isDeleted: false },
  { cardId: 203, setId: 2, term: "useContext", definition: "Hook for consuming context values.", orderIndex: 2, isDeleted: false },
  { cardId: 204, setId: 2, term: "useMemo", definition: "Hook to memoize expensive computations.", orderIndex: 3, isDeleted: false },
  { cardId: 205, setId: 2, term: "useCallback", definition: "Hook to memoize callback functions.", orderIndex: 4, isDeleted: false },
  { cardId: 206, setId: 2, term: "Prop Drilling", definition: "Passing props through multiple levels of components.", orderIndex: 5, isDeleted: false },
  { cardId: 207, setId: 2, term: "JSX", definition: "JavaScript XML - Syntax extension for React.", orderIndex: 6, isDeleted: false },
  { cardId: 208, setId: 2, term: "Virtual DOM", definition: "Lightweight representation of the real DOM.", orderIndex: 7, isDeleted: false },
  { cardId: 209, setId: 2, term: "Higher-Order Component", definition: "Function that takes a component and returns a new one.", orderIndex: 8, isDeleted: false },
  { cardId: 210, setId: 2, term: "Reconciliation", definition: "Process of updating the real DOM to match the virtual DOM.", orderIndex: 9, isDeleted: false },

  // Set 3: History
  { cardId: 301, setId: 3, term: "World War I", definition: "Global conflict from 1914 to 1918.", orderIndex: 0, isDeleted: false },
  { cardId: 302, setId: 3, term: "Treaty of Versailles", definition: "Peace treaty that ended WWI.", orderIndex: 1, isDeleted: false },
  { cardId: 303, setId: 3, term: "Great Depression", definition: "Severe global economic downturn in the 1930s.", orderIndex: 2, isDeleted: false },
  { cardId: 304, setId: 3, term: "World War II", definition: "Global conflict from 1939 to 1945.", orderIndex: 3, isDeleted: false },
  { cardId: 305, setId: 3, term: "United Nations", definition: "Organization formed after WWII to promote peace.", orderIndex: 4, isDeleted: false },
  { cardId: 306, setId: 3, term: "Cold War", definition: "Decades of tension between USA and USSR.", orderIndex: 5, isDeleted: false },
  { cardId: 307, setId: 3, term: "Berlin Wall", definition: "Wall dividing East and West Berlin.", orderIndex: 6, isDeleted: false },
  { cardId: 308, setId: 3, term: "Russian Revolution", definition: "1917 revolution leading to the Soviet Union.", orderIndex: 7, isDeleted: false },
  { cardId: 309, setId: 3, term: "Civil Rights Movement", definition: "USA struggle for racial equality in the 50s-60s.", orderIndex: 8, isDeleted: false },
  { cardId: 310, setId: 3, term: "Space Race", definition: "Competition for space exploration superiority.", orderIndex: 9, isDeleted: false },

  // Set 4: Chemistry
  { cardId: 401, setId: 4, term: "Benzene", definition: "A circular organic hydrocarbon (C6H6).", orderIndex: 0, isDeleted: false },
  { cardId: 402, setId: 4, term: "Alkanes", definition: "Saturated hydrocarbons with single bonds.", orderIndex: 1, isDeleted: false },
  { cardId: 403, setId: 4, term: "Alkenes", definition: "Unsaturated hydrocarbons with at least one double bond.", orderIndex: 2, isDeleted: false },
  { cardId: 404, setId: 4, term: "Alkynes", definition: "Unsaturated hydrocarbons with at least one triple bond.", orderIndex: 3, isDeleted: false },
  { cardId: 405, setId: 4, term: "Isomerism", definition: "Compounds with same formula but different structure.", orderIndex: 4, isDeleted: false },
  { cardId: 406, setId: 4, term: "Nucleophile", definition: "A chemical species that donates an electron pair.", orderIndex: 5, isDeleted: false },
  { cardId: 407, setId: 4, term: "Electrophile", definition: "A chemical species that accepts an electron pair.", orderIndex: 6, isDeleted: false },
  { cardId: 408, setId: 4, term: "SN1 Reaction", definition: "Unimolecular nucleophilic substitution.", orderIndex: 7, isDeleted: false },
  { cardId: 409, setId: 4, term: "SN2 Reaction", definition: "Bimolecular nucleophilic substitution.", orderIndex: 8, isDeleted: false },
  { cardId: 410, setId: 4, term: "Chiral Center", definition: "An atom bonded to four different groups.", orderIndex: 9, isDeleted: false },

  // Set 5: Japanese
  { cardId: 501, setId: 5, term: "Neko", definition: "Cat (猫)", orderIndex: 0, isDeleted: false },
  { cardId: 502, setId: 5, term: "Inu", definition: "Dog (犬)", orderIndex: 1, isDeleted: false },
  { cardId: 503, setId: 5, term: "Mizu", definition: "Water (水)", orderIndex: 2, isDeleted: false },
  { cardId: 504, setId: 5, term: "Taberu", definition: "To eat (食べる)", orderIndex: 3, isDeleted: false },
  { cardId: 505, setId: 5, term: "Nomu", definition: "To drink (飲む)", orderIndex: 4, isDeleted: false },
  { cardId: 506, setId: 5, term: "Ohayou", definition: "Good morning (おはよう)", orderIndex: 5, isDeleted: false },
  { cardId: 507, setId: 5, term: "Konnichiwa", definition: "Hello/Good afternoon (こんにちは)", orderIndex: 6, isDeleted: false },
  { cardId: 508, setId: 5, term: "Sayounara", definition: "Goodbye (さようなら)", orderIndex: 7, isDeleted: false },
  { cardId: 509, setId: 5, term: "Arigatou", definition: "Thank you (ありがとう)", orderIndex: 8, isDeleted: false },
  { cardId: 510, setId: 5, term: "Sensei", definition: "Teacher (先生)", orderIndex: 9, isDeleted: false },

  // Set 6: Capitals
  { cardId: 601, setId: 6, term: "France", definition: "Paris", orderIndex: 0, isDeleted: false },
  { cardId: 602, setId: 6, term: "Germany", definition: "Berlin", orderIndex: 1, isDeleted: false },
  { cardId: 603, setId: 6, term: "Italy", definition: "Rome", orderIndex: 2, isDeleted: false },
  { cardId: 604, setId: 6, term: "UK", definition: "London", orderIndex: 3, isDeleted: false },
  { cardId: 605, setId: 6, term: "USA", definition: "Washington D.C.", orderIndex: 4, isDeleted: false },
  { cardId: 606, setId: 6, term: "Japan", definition: "Tokyo", orderIndex: 5, isDeleted: false },
  { cardId: 607, setId: 6, term: "China", definition: "Beijing", orderIndex: 6, isDeleted: false },
  { cardId: 608, setId: 6, term: "Vietnam", definition: "Hanoi", orderIndex: 7, isDeleted: false },
  { cardId: 609, setId: 6, term: "Thailand", definition: "Bangkok", orderIndex: 8, isDeleted: false },
  { cardId: 610, setId: 6, term: "Russia", definition: "Moscow", orderIndex: 9, isDeleted: false },

  // Set 7: Calculus
  { cardId: 701, setId: 7, term: "Limit", definition: "The value a function approaches as input approaches a point.", orderIndex: 0, isDeleted: false },
  { cardId: 702, setId: 7, term: "Derivative", definition: "The rate of change of a function.", orderIndex: 1, isDeleted: false },
  { cardId: 703, setId: 7, term: "Integral", definition: "The accumulation of values, or area under a curve.", orderIndex: 2, isDeleted: false },
  { cardId: 704, setId: 7, term: "Chain Rule", definition: "Rule for deriving composite functions.", orderIndex: 3, isDeleted: false },
  { cardId: 705, setId: 7, term: "Product Rule", definition: "Rule for deriving the product of two functions.", orderIndex: 4, isDeleted: false },
  { cardId: 706, setId: 7, term: "Power Rule", definition: "Derivative of x^n is n*x^(n-1).", orderIndex: 5, isDeleted: false },
  { cardId: 707, setId: 7, term: "Slope", definition: "The steepness of a line.", orderIndex: 6, isDeleted: false },
  { cardId: 708, setId: 7, term: "Inflection Point", definition: "Point where concavity changes.", orderIndex: 7, isDeleted: false },
  { cardId: 709, setId: 7, term: "Optimization", definition: "Finding the maximum or minimum value of a function.", orderIndex: 8, isDeleted: false },
  { cardId: 710, setId: 7, term: "Fundamental Theorem", definition: "Links differentiation and integration.", orderIndex: 9, isDeleted: false },

  // Set 8: Design
  { cardId: 801, setId: 8, term: "Hierarchy", definition: "Arrangement of elements to show importance.", orderIndex: 0, isDeleted: false },
  { cardId: 802, setId: 8, term: "Contrast", definition: "Difference between light/dark or colors.", orderIndex: 1, isDeleted: false },
  { cardId: 803, setId: 8, term: "Alignment", definition: "Positioning elements relative to each other.", orderIndex: 2, isDeleted: false },
  { cardId: 804, setId: 8, term: "Repetition", definition: "Using consistent styles or elements.", orderIndex: 3, isDeleted: false },
  { cardId: 805, setId: 8, term: "Proximity", definition: "Grouping related items together.", orderIndex: 4, isDeleted: false },
  { cardId: 806, setId: 8, term: "Typography", definition: "The art and technique of arranging type.", orderIndex: 5, isDeleted: false },
  { cardId: 807, setId: 8, term: "Whitespace", definition: "Negative space between design elements.", orderIndex: 6, isDeleted: false },
  { cardId: 808, setId: 8, term: "Grid System", definition: "Structure for organizing content.", orderIndex: 7, isDeleted: false },
  { cardId: 809, setId: 8, term: "Color Theory", definition: "Rules for combining and using colors.", orderIndex: 8, isDeleted: false },
  { cardId: 810, setId: 8, term: "Affordance", definition: "Properties of an object that indicate how to use it.", orderIndex: 9, isDeleted: false },

  // Set 9: Physics
  { cardId: 901, setId: 9, term: "Thermodynamics", definition: "Study of heat, work, and energy.", orderIndex: 0, isDeleted: false },
  { cardId: 902, setId: 9, term: "First Law", definition: "Energy cannot be created or destroyed.", orderIndex: 1, isDeleted: false },
  { cardId: 903, setId: 9, term: "Second Law", definition: "Total entropy of a system always increases.", orderIndex: 2, isDeleted: false },
  { cardId: 904, setId: 9, term: "Third Law", definition: "Entropy approaches a constant as temp reaches absolute zero.", orderIndex: 3, isDeleted: false },
  { cardId: 905, setId: 9, term: "Entropy", definition: "Measure of disorder or randomness.", orderIndex: 4, isDeleted: false },
  { cardId: 906, setId: 9, term: "Enthalpy", definition: "Total heat content of a system.", orderIndex: 5, isDeleted: false },
  { cardId: 907, setId: 9, term: "Specific Heat", definition: "Energy required to raise temp by 1 degree.", orderIndex: 6, isDeleted: false },
  { cardId: 908, setId: 9, term: "Heat Transfer", definition: "Movement of thermal energy (conduction, convection, radiation).", orderIndex: 7, isDeleted: false },
  { cardId: 909, setId: 9, term: "Carnot Cycle", definition: "Theoretical most efficient heat engine cycle.", orderIndex: 8, isDeleted: false },
  { cardId: 910, setId: 9, term: "Latent Heat", definition: "Energy absorbed/released during a phase change.", orderIndex: 9, isDeleted: false },

  // Set 10: Economics
  { cardId: 1001, setId: 10, term: "Supply", definition: "The total amount of a product available.", orderIndex: 0, isDeleted: false },
  { cardId: 1002, setId: 10, term: "Demand", definition: "The total desire for a product.", orderIndex: 1, isDeleted: false },
  { cardId: 1003, setId: 10, term: "Equilibrium", definition: "Point where supply equals demand.", orderIndex: 2, isDeleted: false },
  { cardId: 1004, setId: 10, term: "Inflation", definition: "The rate at which prices rise.", orderIndex: 3, isDeleted: false },
  { cardId: 1005, setId: 10, term: "Deflation", definition: "The rate at which prices fall.", orderIndex: 4, isDeleted: false },
  { cardId: 1006, setId: 10, term: "GDP", definition: "Gross Domestic Product - Total value of goods/services.", orderIndex: 5, isDeleted: false },
  { cardId: 1007, setId: 10, term: "Opportunity Cost", definition: "Loss of gain from other alternatives.", orderIndex: 6, isDeleted: false },
  { cardId: 1008, setId: 10, term: "Elasticity", definition: "Measurement of how quantities respond to price changes.", orderIndex: 7, isDeleted: false },
  { cardId: 1009, setId: 10, term: "Monopoly", definition: "A market with only one seller.", orderIndex: 8, isDeleted: false },
  { cardId: 1010, setId: 10, term: "Oligopoly", definition: "A market with a small number of sellers.", orderIndex: 9, isDeleted: false }
];

export const mockFolders = [
  { folderId: 1, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Computer Science", description: "CS resources", visibility: "PRIVATE", isDeleted: false, categories: ["Programming"], createdAt: "2023-04-15", setCount: 1 },
  { folderId: 2, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "Medical Studies", description: "Health and medicine", visibility: "PUBLIC", isDeleted: false, categories: ["Medicine"], createdAt: "2023-05-15", setCount: 0 },
  { folderId: 3, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Language Learning", description: "All my languages", visibility: "PRIVATE", isDeleted: false, categories: ["Language"], createdAt: "2023-06-15", setCount: 1 },
  { folderId: 4, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "General Science", description: "Physics, Chem, Bio", visibility: "PUBLIC", isDeleted: false, categories: ["Science"], createdAt: "2023-07-15", setCount: 3 },
  { folderId: 5, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Mathematics", description: "Calculus and Algebra", visibility: "PRIVATE", isDeleted: false, categories: ["Math"], createdAt: "2023-08-15", setCount: 0 },
  { folderId: 6, owner: mockUsers[2], ownerDisplayName: "System Admin", name: "Design Resources", description: "UI/UX", visibility: "PUBLIC", isDeleted: false, categories: ["Design"], createdAt: "2023-09-15", setCount: 0 },
  { folderId: 7, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "History Prep", description: "Exam prep", visibility: "PUBLIC", isDeleted: false, categories: ["History"], createdAt: "2023-10-15", setCount: 0 },
  { folderId: 8, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Economics", description: "Macro and Micro", visibility: "PRIVATE", isDeleted: false, categories: ["Finance"], createdAt: "2023-11-15", setCount: 0 },
  { folderId: 9, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "Travel Info", description: "Capitals and Culture", visibility: "PUBLIC", isDeleted: false, categories: ["Geography"], createdAt: "2023-12-15", setCount: 0 },
  { folderId: 10, owner: mockUsers[2], ownerDisplayName: "System Admin", name: "Admin Tools", description: "System guides", visibility: "PRIVATE", isDeleted: false, categories: ["Admin"], createdAt: "2024-01-15", setCount: 0 }
];

export const mockClasses = [
  { classId: 1, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "Biology 101", description: "Intro to Biology", joinCode: "BIO-101", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-08-01" },
  { classId: 2, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "React Workshop", description: "Hands-on React", joinCode: "REACT-W", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-08-10" },
  { classId: 3, owner: mockUsers[2], ownerDisplayName: "System Admin", className: "System Admin Training", description: "Kuizu Admin", joinCode: "ADM-99", visibility: "PRIVATE", status: "APPROVED", createdAt: "2023-08-15" },
  { classId: 4, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "Physics Honors", description: "Adv Physics", joinCode: "PHY-HONOR", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-01" },
  { classId: 5, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "Calculus Lab", description: "Math practice", joinCode: "MATH-LAB", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-05" },
  { classId: 6, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "Japanese Basic", description: "N5 Level", joinCode: "JPN-N5", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-10" },
  { classId: 7, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "World History Seminar", description: "Discussion", joinCode: "HIST-SEM", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-15" },
  { classId: 8, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "Design Bootcamp", description: "Intensive", joinCode: "UX-CAMP", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-09-20" },
  { classId: 9, owner: mockUsers[2], ownerDisplayName: "System Admin", className: "Platform Moderation", description: "For Mods", joinCode: "MOD-KU", visibility: "PRIVATE", status: "APPROVED", createdAt: "2023-09-25" },
  { classId: 10, owner: mockUsers[1], ownerDisplayName: "Jane Smith", className: "Economics Advanced", description: "PhD Prep", joinCode: "ECON-ADV", visibility: "PUBLIC", status: "APPROVED", createdAt: "2023-10-01" }
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
