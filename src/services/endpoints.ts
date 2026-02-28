import api from "./api";

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post("/api/auth/login", { email, password }),
  forgotPassword: (email: string) =>
    api.post("/api/auth/forgot-password", { email }),
  resetPassword: (token: string, password: string) =>
    api.post("/api/auth/reset-password", { token, password }),
  me: () => api.get("/api/auth/me"),
  logout: () => api.post("/api/auth/logout"),
};

// Device API
export const deviceApi = {
  list: (params?: Record<string, string>) =>
    api.get("/api/devices", { params }),
  getById: (id: string) =>
    api.get(`/api/devices/${id}`),
  sendCommand: (id: string, command: string) =>
    api.post(`/api/devices/${id}/command`, { command }),
  getMetrics: (id: string) =>
    api.get(`/api/devices/${id}/metrics`),
  getLogs: (id: string, params?: Record<string, string>) =>
    api.get(`/api/devices/${id}/logs`, { params }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get("/api/dashboard/stats"),
  getAlerts: () => api.get("/api/dashboard/alerts"),
  getActivity: () => api.get("/api/dashboard/activity"),
};

// Tenant API
export const tenantApi = {
  getCurrent: () => api.get("/api/tenant"),
  getUsers: () => api.get("/api/tenant/users"),
};
