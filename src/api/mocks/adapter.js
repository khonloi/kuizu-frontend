import { mockApi } from './handlers';

export const setupMockAdapter = (api) => {
  api.defaults.adapter = async (config) => {
    const url = config.url;
    console.log(`[Mock API] Intercepted: ${config.method.toUpperCase()} ${url}`);

    let data;
    try {
      // Auth
      if (url.includes("/auth/login")) {
        const { usernameOrEmail, password } = JSON.parse(config.data);
        data = await mockApi.login(usernameOrEmail, password);
      }
      else if (url.includes("/auth/register")) {
        data = await mockApi.register(JSON.parse(config.data));
      }
      
      // User / Profile
      else if (url.includes("/users/me")) data = await mockApi.getMyProfile();
      else if (url.includes("/users/profile")) data = await mockApi.updateProfile(JSON.parse(config.data));
      
      // Flashcard Sets
      else if (url.includes("/flashcard-sets/my")) data = await mockApi.getMyFlashcardSets();
      else if (url.includes("/flashcard-sets")) {
        const setIdMatch = url.match(/\/flashcard-sets\/(\d+)/);
        if (setIdMatch) {
            data = await mockApi.getFlashcardSetById(setIdMatch[1]);
        } else if (config.method.toLowerCase() === 'post') {
            data = await mockApi.createFlashcardSet(JSON.parse(config.data));
        } else {
            data = await mockApi.getPublicFlashcardSets();
        }
      }
      
      // Flashcards
      else if (url.includes("/flashcards/set/")) {
        const setIdMatch = url.match(/\/flashcards\/set\/(\d+)/);
        data = setIdMatch ? await mockApi.getFlashcardsBySetId(setIdMatch[1]) : [];
      }
      
      // Folders
      else if (url.includes("/folders/me")) data = await mockApi.getMyFolders();
      else if (url.includes("/folders/public")) data = await mockApi.getPublicFolders();
      else if (url.includes("/folders/")) {
        const folderIdMatch = url.match(/\/folders\/(\d+)/);
        if (folderIdMatch) {
            data = await mockApi.getFolderDetail(folderIdMatch[1]);
        } else if (config.method.toLowerCase() === 'post') {
            data = await mockApi.createFolder(JSON.parse(config.data));
        } else {
            data = [];
        }
      }
      
      // Classes
      else if (url.includes("/classes/me")) data = await mockApi.getMyClasses();
      else if (url.includes("/classes/public")) data = await mockApi.getPublicClasses();
      else if (url.includes("/classes/")) {
        const classIdMatch = url.match(/\/classes\/(\d+)/);
        if (classIdMatch) {
          if (url.includes("/join")) {
            data = await mockApi.joinClass(classIdMatch[1], JSON.parse(config.data));
          } else {
            data = await mockApi.getClassDetails(classIdMatch[1]);
          }
        } else {
          data = [];
        }
      }
      
      // Notifications
      else if (url.includes("/notifications")) {
        const markAsReadMatch = url.match(/\/notifications\/(\d+)\/read/);
        if (markAsReadMatch) {
            data = await mockApi.markAsRead(markAsReadMatch[1]);
        } else {
            data = await mockApi.getNotifications();
        }
      }
      
      // Study / Quiz
      else if (url.includes("/study/quiz/submit")) data = await mockApi.submitQuiz(JSON.parse(config.data));
      else if (url.includes("/study/progress/")) {
        const setIdMatch = url.match(/\/study\/progress\/(\d+)/);
        data = await mockApi.getStudyProgress(setIdMatch[1]);
      }
      
      else data = [];

      return {
        data,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    } catch (error) {
      console.error(`[Mock API] Error:`, error);
      return Promise.reject({
        response: {
          data: { message: error.message || error.response?.data?.message || "Mock error" },
          status: error.response?.status || 500,
          statusText: error.statusText || "Internal Server Error",
          headers: {},
          config,
        },
      });
    }
  };
};
