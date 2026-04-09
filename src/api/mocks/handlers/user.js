import { mockUsers } from '../data';

export const userHandlers = {
  getMyProfile: async () => { return mockUsers[0]; },
  updateProfile: async (data) => { return { ...mockUsers[0], ...data }; },
};
