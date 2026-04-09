import { mockUsers } from './users';

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

export const mockFolderSets = [
  { folderId: 1, setId: 2 },
  { folderId: 3, setId: 5 },
  { folderId: 4, setId: 1 },
  { folderId: 4, setId: 4 },
  { folderId: 4, setId: 9 }
];
