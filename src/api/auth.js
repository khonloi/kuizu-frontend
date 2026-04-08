import axios from "axios";

const isMockMode = import.meta.env.VITE_USE_MOCK === "true";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mocking mechanism: Use an adapter to short-circuit requests before they are sent
if (isMockMode) {
  api.defaults.adapter = async (config) => {
    const { mockApi } = await import("./mockApi");
    const url = config.url;
    console.log(`[Mock API] Intercepted: ${config.method.toUpperCase()} ${url}`);

    let data;
    try {
      if (url.includes("/users/me")) data = await mockApi.getMyProfile();
      else if (url.includes("/flashcard-sets/my")) data = await mockApi.getMyFlashcardSets();
      else if (url.includes("/flashcard-sets")) {
        const setIdMatch = url.match(/\/flashcard-sets\/(\d+)/);
        data = setIdMatch ? await mockApi.getFlashcardSetById(setIdMatch[1]) : await mockApi.getPublicFlashcardSets();
      }
      else if (url.includes("/folders/me")) data = await mockApi.getMyFolders();
      else if (url.includes("/classes/me")) data = await mockApi.getMyClasses();
      else if (url.includes("/notifications")) data = await mockApi.getNotifications();
      else if (url.includes("/classes/")) {
        const classIdMatch = url.match(/\/classes\/(\d+)/);
        data = classIdMatch ? await mockApi.getClassDetails(classIdMatch[1]) : [];
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
      return Promise.reject({
        response: {
          data: { message: error.message || "Mock error" },
          status: error.response?.status || 500,
          statusText: "Internal Server Error",
          headers: {},
          config,
        },
      });
    }
  };
} else {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.dispatchEvent(new CustomEvent("force-logout"));
      }
      return Promise.reject(error);
    },
  );
}

export const login = async (usernameOrEmail, password) => {
  const response = await api.post("/auth/login", { usernameOrEmail, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const googleLogin = async (idToken) => {
  const response = await api.post("/auth/google", { idToken });
  return response.data;
};

export const verifyRegistration = async (email, otpCode) => {
  const response = await api.post("/auth/verify-registration", {
    email,
    otpCode,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (email, otpCode, newPassword) => {
  const response = await api.post("/auth/reset-password", {
    email,
    otpCode,
    newPassword,
  });
  return response.data;
};

export const resendRegistrationOtp = async (email) => {
  const response = await api.post("/auth/resend-registration-otp", { email });
  return response.data;
};

export default api;
