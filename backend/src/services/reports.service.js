import Task from "../models/task.model.js"; // Ensure Task model is used
import logger from "../config/logger.js"; // Import logger

// Burndown Data: Completed tasks over time
export const getBurndownData = async () => {
  try {
    const burndownData = await Task.aggregate([
      { $match: { status: "done" } }, // Only completed tasks
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } }, // Group by date
          count: { $sum: 1 }, // Count the number of completed tasks
        },
      },
      { $sort: { _id: 1 } }, // Sort by date ascending
    ]);
    return burndownData;
  } catch (error) {
    logger.error("Error fetching burndown data:", error);
    throw new Error("Error fetching burndown data");
  }
};

// Velocity: Tasks Completed per Sprint (or Iteration)
export const getTeamVelocity = async () => {
  try {
    const velocityData = await Task.aggregate([
      { $match: { status: "done" } }, // Only completed tasks
      {
        $group: {
          _id: "$sprint", // Group by sprint/iteration
          velocity: { $sum: 1 }, // Count the number of tasks completed per sprint
        },
      },
      { $sort: { _id: 1 } }, // Sort by sprint/iteration
    ]);
    return velocityData;
  } catch (error) {
    logger.error("Error fetching velocity data:", error);
    throw new Error("Error fetching velocity data");
  }
};

// Workload Analysis: Task Count per User
export const getWorkloadData = async () => {
  try {
    const workloadData = await Task.aggregate([
      {
        $group: {
          _id: "$assignee", // Group tasks by assignee (user)
          taskCount: { $sum: 1 }, // Count tasks per user
        },
      },
      { $sort: { taskCount: -1 } }, // Sort by task count (descending)
    ]);
    return workloadData;
  } catch (error) {
    logger.error("Error fetching workload data:", error);
    throw new Error("Error fetching workload data");
  }
};

// Recurring Tasks: Task Counts by Recurrence Type (Daily, Weekly, Monthly)
export const getRecurringTasksData = async () => {
  try {
    const recurringData = await Task.aggregate([
      { $match: { recurring: { $ne: "none" } } }, // Filter recurring tasks
      {
        $group: {
          _id: "$recurring", // Group by recurrence type
          count: { $sum: 1 }, // Count tasks by recurrence type
        },
      },
      { $sort: { _id: 1 } }, // Sort by recurrence type
    ]);
    return recurringData;
  } catch (error) {
    logger.error("Error fetching recurring tasks data:", error);
    throw new Error("Error fetching recurring tasks data");
  }
};

// Time Tracking Data: Sum of Total Tracked Time per User
export const getTimeTrackingData = async () => {
  try {
    const timeTrackingData = await Task.aggregate([
      {
        $group: {
          _id: "$assignee", // Group tasks by assignee (user)
          totalTrackedTime: { $sum: "$totalTrackedTime" }, // Sum time tracked for each user
        },
      },
      { $sort: { totalTrackedTime: -1 } }, // Sort by total time tracked (descending)
    ]);
    return timeTrackingData;
  } catch (error) {
    logger.error("Error fetching time tracking data:", error);
    throw new Error("Error fetching time tracking data");
  }
};
