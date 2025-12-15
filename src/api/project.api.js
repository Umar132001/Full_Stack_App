import api from "./axios";

export const getMyProjectsApi = () => api.get("/projects");
export const getProjectApi = (id) => api.get(`/projects/${id}`);
export const createProjectApi = (data) => api.post("/projects", data);
export const updateProjectApi = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProjectApi = (id) => api.delete(`/projects/${id}`);

export const inviteMemberApi = (projectId, payload) =>
  api.post(`/projects/${projectId}/invite`, payload);

export const removeMemberApi = (projectId, userId) =>
  api.delete(`/projects/${projectId}/members/${userId}`);
