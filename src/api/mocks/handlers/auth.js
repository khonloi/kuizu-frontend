import { mockUsers } from '../data';

export const authHandlers = {
  login: async (usernameOrEmail, password) => {
    const user = mockUsers.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);
    if (user) return { token: "mock-token-" + user.userId, user };
    throw { response: { status: 401, data: { message: "Invalid credentials" } } };
  },
  register: async (userData) => { 
    return { message: "Success", user: { ...userData, userId: "new-user-id" } }; 
  },
};
