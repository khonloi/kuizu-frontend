import { mockFlashcardSets, mockFlashcards } from '../data';

export const flashcardHandlers = {
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
  getFlashcardsBySetId: async (setId) => { 
    return mockFlashcards.filter(c => c.setId === parseInt(setId)); 
  },
  createFlashcardSet: async (data) => { 
    return { ...data, setId: Math.floor(Math.random() * 1000) }; 
  },
};
