import { mockUsers } from './users';

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

export const mockClassMembers = [
  { classId: 1, user: mockUsers[0], role: "STUDENT" },
  { classId: 1, user: mockUsers[3], role: "STUDENT" },
  { classId: 1, user: mockUsers[4], role: "STUDENT" },
  { classId: 2, user: mockUsers[0], role: "STUDENT" },
  { classId: 2, user: mockUsers[3], role: "STUDENT" }
];
