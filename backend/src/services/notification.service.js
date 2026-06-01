import { Notification } from "../models/notification.model.js";

export const createNotification = async ({
  userId,
  title,
  message,
  referenceType = null,
  referenceId = null,
}) => {
  return await Notification.create({
    userId,
    title,
    message,
    referenceType,
    referenceId,
  });
};

export const getMyNotifications = async (userId) => {
  return await Notification.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      userId,
    },
    {
      isRead: true,
    },
    {
      new: true,
    },
  );

  if (!notification) {
    throw new Error("Notification not found");
  }

  return notification;
};

export const getUnreadNotificationCount = async (userId) => {
  return await Notification.countDocuments({
    userId,
    isRead: false,
  });
};

export const markAllNotificationsAsRead = async (userId) => {
  await Notification.updateMany(
    {
      userId,
      isRead: false,
    },
    {
      isRead: true,
    },
  );

  return true;
};

/* ADD BELOW */

export const deleteNotification = async (notificationId, userId) => {
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return true;
};

export const deleteAllNotifications = async (userId) => {
  await Notification.deleteMany({
    userId,
  });

  return true;
};
