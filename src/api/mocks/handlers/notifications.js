import { mockNotifications } from '../data';

export const notificationHandlers = {
  getNotifications: async () => { return mockNotifications; },
  markAsRead: async (notifId) => { return { success: true }; },
};
