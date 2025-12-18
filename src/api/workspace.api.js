// api/workspace.api.js
import api from "./axios";

// Function to create a new workspace
export const createWorkspaceApi = async (workspaceData) => {
  try {
    const response = await api.post("/workspaces", workspaceData);
    return response.data; // Assuming your backend returns a data object with success and workspace
  } catch (error) {
    console.error("Error creating workspace:", error);
    throw error;
  }
};

export const addMemberToWorkspaceApi = async (workspaceId, memberData) => {
  try {
    const response = await api.post(
      `/workspaces/${workspaceId}/members`,
      memberData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add member to workspace.");
  }
};

// Function to get all workspaces (for WorkspaceDashboard.jsx)
export const getWorkspacesApi = async () => {
  try {
    const response = await api.get("/workspaces");
    return response.data;
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    throw error;
  }
};

// Fetch details of a single workspace
export const getWorkspaceApi = async (workspaceId) => {
  const response = await api.get(`/workspaces/${workspaceId}`);
  return response.data;
};

// Add a member to a workspace
export const addMemberApi = async (workspaceId, userId, role) => {
  const response = await api.post(`/workspaces/${workspaceId}/members`, {
    userId,
    role,
  });
  return response.data;
};

// Remove member from workspace
export const removeMemberFromWorkspaceApi = (workspaceId, data) => {
  return api.delete(`/workspaces/${workspaceId}/member`, { data });
};

// Delete workspace
export const deleteWorkspaceApi = (workspaceId) => {
  return api.delete(`/workspaces/${workspaceId}`);
};
