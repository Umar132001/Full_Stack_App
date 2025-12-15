import catchAsync from "../utils/catchAsync.js";
import { logActivity, getAuditLogs } from "../services/auditLog.service.js"; // AuditLog service
import logger from "../config/logger.js"; // Import the logger

// Log activity (e.g., create, update, delete)
export const log = catchAsync(async (req, res) => {
  const { action, entity, entityId, details } = req.body;

  logger.debug(
    `Logging activity: action=${action}, entity=${entity}, entityId=${entityId}, details=${details}`
  );

  const activity = await logActivity(
    req.user.id,
    action,
    entity,
    entityId,
    details
  );

  logger.info(
    `Activity logged for user ${req.user.id}: ${JSON.stringify(activity)}`
  );

  res.status(201).json({ success: true, activity });
});

// Get user activities
export const getUserActivities = catchAsync(async (req, res) => {
  logger.debug(`Fetching activities for user ${req.user.id}`);

  const activities = await getAuditLogs(req.user.id);

  logger.info(
    `Retrieved ${activities.length} activities for user ${req.user.id}`
  );

  res.json({ success: true, activities });
});
