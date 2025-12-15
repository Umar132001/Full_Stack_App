import catchAsync from "../utils/catchAsync.js";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
} from "../services/notification.service.js";
import logger from "../config/logger.js"; // Import the logger

export const create = catchAsync(async (req, res) => {
  const { message, type } = req.body;

  logger.debug(
    `Received notification creation request: message=${message}, type=${type}`
  );

  const notification = await createNotification(req.user.id, message, type);

  logger.info(
    `Notification created for user ${req.user.id}: ${JSON.stringify(
      notification
    )}`
  );

  res.status(201).json({ success: true, notification });
});

export const getUserNotification = catchAsync(async (req, res) => {
  logger.debug(`Fetching notifications for user ${req.user.id}`);

  const notifications = await getUserNotifications(req.user.id);

  logger.info(
    `Retrieved ${notifications.length} notifications for user ${req.user.id}`
  );

  res.json({ success: true, notifications });
});

export const markRead = catchAsync(async (req, res) => {
  logger.debug(
    `Marking notification as read: notificationId=${req.params.notificationId}`
  );

  const notification = await markAsRead(req.params.notificationId);

  logger.info(`Notification marked as read: ${JSON.stringify(notification)}`);

  res.json({ success: true, notification });
});
