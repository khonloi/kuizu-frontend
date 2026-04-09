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
  import("./mocks/adapter").then(({ setupMockAdapter }) => {
    setupMockAdapter(api);
  });
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
