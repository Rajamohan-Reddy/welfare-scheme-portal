import {
  getMyNotifications,
  markAsRead,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../services/notification.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const getMine = async (req, res) => {
  try {
    const notifications = await getMyNotifications(req.user.userId);

    return successResponse({
      res,
      data: notifications,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const read = async (req, res) => {
  try {
    const notification = await markAsRead(req.params.id, req.user.userId);

    return successResponse({
      res,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const unreadCount = async (req, res) => {
  try {
    const count = await getUnreadNotificationCount(req.user.userId);

    return successResponse({
      res,
      data: {
        unreadCount: count,
      },
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const markAllRead = async (req, res) => {
  try {
    await markAllNotificationsAsRead(req.user.userId);

    return successResponse({
      res,
      message: "All notifications marked as read",
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteNotification(req.params.id, req.user.userId);

    return successResponse({
      res,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const removeAll = async (req, res) => {
  try {
    await deleteAllNotifications(req.user.userId);

    return successResponse({
      res,
      message: "All notifications deleted successfully",
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
