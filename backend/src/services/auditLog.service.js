import AuditLog from "../models/auditLog.model.js"; // AuditLog model
import logger from "../config/logger.js"; // Import the logger

// Log activity (creating a new audit log entry)
export const logActivity = async (user, action, entity, entityId, details) => {
  logger.debug(
    `Creating activity log: user=${user}, action=${action}, entity=${entity}, entityId=${entityId}, details=${details}`
  );

  const auditLog = new AuditLog({ user, action, entity, entityId, details });
  await auditLog.save();

  logger.info(`Activity log created: ${JSON.stringify(auditLog)}`);

  return auditLog;
};

// Get audit logs for a user
export const getAuditLogs = async (userId) => {
  logger.debug(`Retrieving audit logs for user ${userId}`);

  const auditLogs = await AuditLog.find({ user: userId }).sort({
    createdAt: -1,
  });

  logger.info(`Retrieved ${auditLogs.length} audit logs for user ${userId}`);

  return auditLogs;
};
