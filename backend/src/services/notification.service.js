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
