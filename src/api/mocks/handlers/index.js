import { authHandlers } from './auth';
import { flashcardHandlers } from './flashcards';
import { folderHandlers } from './folders';
import { classHandlers } from './classes';
import { notificationHandlers } from './notifications';
import { userHandlers } from './user';
import { studyHandlers } from './study';

export const mockApi = {
  ...authHandlers,
  ...flashcardHandlers,
  ...folderHandlers,
  ...classHandlers,
  ...notificationHandlers,
  ...userHandlers,
  ...studyHandlers
};

export default mockApi;
