import api from "./axios";

// API call to fetch tasks for a specific project
export const getTasksByProjectIdApi = (projectId) =>
  api.get(`/tasks?projectId=${projectId}`);

export const updateTaskApi = (taskId, taskData) => {
  return api.patch(`/tasks/${taskId}`, taskData);
};

// API call to delete a task by ID
export const deleteTaskApi = (taskId) => {
  return api.delete(`/tasks/${taskId}`); // Call the DELETE endpoint with taskId
};

// API to create a new task
export const createTaskApi = (taskData) => api.post("/tasks", taskData);

// API to fetch projects (for selecting project)
export const getProjectsApi = () => api.get("/projects");

// API to fetch users (for selecting assignee)
export const getUsersApi = () => api.get("/users");
