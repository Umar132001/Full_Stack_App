import catchAsync from "../utils/catchAsync.js"; // Utility to catch async errors
import * as reportsService from "../services/reports.service.js"; // Reports service

// Get Burndown Data
export const getBurndownData = catchAsync(async (req, res) => {
  const burndownData = await reportsService.getBurndownData();
  res.status(200).json({ success: true, data: burndownData });
});

// Get Team Velocity Data
export const getTeamVelocity = catchAsync(async (req, res) => {
  const velocityData = await reportsService.getTeamVelocity();
  res.status(200).json({ success: true, data: velocityData });
});

// Get Workload Analysis Data
export const getWorkloadData = catchAsync(async (req, res) => {
  const workloadData = await reportsService.getWorkloadData();
  res.status(200).json({ success: true, data: workloadData });
});

// Get Recurring Tasks Data
export const getRecurringTasksData = catchAsync(async (req, res) => {
  const recurringData = await reportsService.getRecurringTasksData();
  res.status(200).json({ success: true, data: recurringData });
});

// Get Time Tracking Data
export const getTimeTrackingData = catchAsync(async (req, res) => {
  const timeTrackingData = await reportsService.getTimeTrackingData();
  res.status(200).json({ success: true, data: timeTrackingData });
});
