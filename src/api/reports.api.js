import api from "./axios";

// // Get Burndown Data
// export const getBurndownDataApi = () => api.get("/reports/burndown");

// // Get Team Velocity Data
// export const getTeamVelocityApi = () => api.get("/reports/velocity");

// Get Workload Analysis Data
export const getWorkloadDataApi = () => api.get("/reports/workload");

// Get Recurring Tasks Data
export const getRecurringTasksDataApi = () => api.get("/reports/recurring");

// Get Time Tracking Data
export const getTimeTrackingDataApi = () => api.get("/reports/time-tracking");

export const getBurndownDataApi = async () => {
  try {
    const response = await api.get("/reports/burndown");
    return response.data.data; // Assuming the data comes in a { success, data } structure
  } catch (error) {
    console.error("Error fetching burndown data", error);
    throw error;
  }
};

export const getTeamVelocityApi = async () => {
  try {
    const response = await api.get("/reports/velocity");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching velocity data", error);
    throw error;
  }
};
