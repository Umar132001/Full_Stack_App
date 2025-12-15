import Notification from "../models/notification.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import pubsub from "../utils/pubsub.js";
import logger from "../config/logger.js"; // Import the logger

export const createNotification = async (user, message, type) => {
  logger.debug(
    `Creating notification for user ${user._id}: message=${message}, type=${type}`
  );

  const notification = new Notification({ user, message, type });
  await notification.save();

  logger.info(`Notification saved: ${JSON.stringify(notification)}`);

  // Send email notification if type is email
  if (type === "email") {
    logger.info(`Sending email notification to ${user.email}`);
    await sendEmail(user.email, "New Notification", message);
  }

  // Send push notification if type is push
  if (type === "push") {
    logger.info(`Publishing push notification for user ${user._id}`);
    pubsub.publish("notification", { userId: user._id, message });
  }

  return notification;
};

export const getUserNotifications = async (userId) => {
  logger.debug(`Retrieving notifications for user ${userId}`);

  const notifications = await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });

  logger.info(
    `Retrieved ${notifications.length} notifications for user ${userId}`
  );

  return notifications;
};

export const markAsRead = async (notificationId) => {
  logger.debug(
    `Marking notification as read: notificationId=${notificationId}`
  );

  const notification = await Notification.findByIdAndUpdate(notificationId, {
    read: true,
  });

  logger.info(`Notification marked as read: ${JSON.stringify(notification)}`);

  return notification;
};
