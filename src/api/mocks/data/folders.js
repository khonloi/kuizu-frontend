import { mockUsers } from './users';

export const mockFolders = [
  { folderId: 1, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Computer Science", description: "CS resources", visibility: "PRIVATE", isDeleted: false, categories: ["Programming"], createdAt: "2023-04-15", setCount: 1 },
  { folderId: 2, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "80s Music & Culture", description: "Everything New Wave, Post-Punk, and Synthpop.", visibility: "PUBLIC", isDeleted: false, categories: ["Music"], createdAt: "2023-05-15", setCount: 2 },
  { folderId: 3, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Language Learning", description: "All my languages", visibility: "PRIVATE", isDeleted: false, categories: ["Language"], createdAt: "2023-06-15", setCount: 2 },
  { folderId: 4, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "General Science", description: "Physics, Chem, Bio", visibility: "PUBLIC", isDeleted: false, categories: ["Science"], createdAt: "2023-07-15", setCount: 3 },
  { folderId: 5, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Mathematics", description: "Calculus and Algebra", visibility: "PRIVATE", isDeleted: false, categories: ["Math"], createdAt: "2023-08-15", setCount: 1 },
  { folderId: 6, owner: mockUsers[2], ownerDisplayName: "System Admin", name: "Design Resources", description: "UI/UX", visibility: "PUBLIC", isDeleted: false, categories: ["Design"], createdAt: "2023-09-15", setCount: 1 },
  { folderId: 7, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "European Post-Punk", description: "Manchester to Berlin movements.", visibility: "PUBLIC", isDeleted: false, categories: ["Culture"], createdAt: "2023-10-15", setCount: 2 },
  { folderId: 8, owner: mockUsers[0], ownerDisplayName: "John Doe", name: "Economics", description: "Macro and Micro", visibility: "PRIVATE", isDeleted: false, categories: ["Finance"], createdAt: "2023-11-15", setCount: 2 },
  { folderId: 9, owner: mockUsers[1], ownerDisplayName: "Jane Smith", name: "Travel Info", description: "Capitals and Culture", visibility: "PUBLIC", isDeleted: false, categories: ["Geography"], createdAt: "2023-12-15", setCount: 2 },
  { folderId: 10, owner: mockUsers[2], ownerDisplayName: "System Admin", name: "Admin Tools", description: "System guides", visibility: "PRIVATE", isDeleted: false, categories: ["Admin"], createdAt: "2024-01-15", setCount: 2 }
];

export const mockFolderSets = [
  { folderId: 1, setId: 2 },
  { folderId: 2, setId: 1 },
  { folderId: 2, setId: 3 },
  { folderId: 3, setId: 5 },
  { folderId: 3, setId: 6 },
  { folderId: 4, setId: 1 },
  { folderId: 4, setId: 4 },
  { folderId: 4, setId: 9 },
  { folderId: 5, setId: 7 },
  { folderId: 6, setId: 8 },
  { folderId: 7, setId: 3 },
  { folderId: 7, setId: 10 },
  { folderId: 8, setId: 2 },
  { folderId: 8, setId: 7 },
  { folderId: 9, setId: 6 },
  { folderId: 9, setId: 9 },
  { folderId: 10, setId: 8 },
  { folderId: 10, setId: 1 }
];
