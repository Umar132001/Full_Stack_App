import api from "./axios";

export const registerApi = (payload) => api.post("/auth/register", payload);
export const loginApi = (payload) => api.post("/auth/login", payload);
export const forgotPasswordApi = (payload) =>
  api.post("/auth/forgot-password", payload);
export const resetPasswordApi = (payload) =>
  api.post("/auth/reset-password", payload);
export const verifyEmailApi = (token) =>
  api.get(`/auth/verify-email?token=${token}`);

export const getMeApi = () => api.get("/users/me");
