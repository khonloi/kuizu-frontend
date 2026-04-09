import { mockFolders, mockFolderSets, mockFlashcardSets } from "../data";

export const folderHandlers = {
  getMyFolders: async (userId = "u1-uuid-1234-5678") => {
    return mockFolders
      .filter((f) => f.owner.userId === userId)
      .map((f) => ({ ...f, title: f.name }));
  },
  getPublicFolders: async () => {
    return mockFolders
      .filter((f) => f.visibility === "PUBLIC")
      .map((f) => ({ ...f, title: f.name }));
  },
  getFolderDetail: async (folderId) => {
    const folder = mockFolders.find((f) => f.folderId === parseInt(folderId));
    if (!folder) return null;
    const setIds = mockFolderSets
      .filter((fs) => fs.folderId === folder.folderId)
      .map((fs) => fs.setId);
    const sets = mockFlashcardSets.filter((s) => setIds.includes(s.setId));
    return {
      ...folder,
      sets,
      ownerId: folder.owner.userId,
      ownerUserId: folder.owner.userId,
      ownerUsername: folder.owner.username,
    };
  },
  createFolder: async (data) => {
    return { ...data, folderId: Math.floor(Math.random() * 1000) };
  },
};
