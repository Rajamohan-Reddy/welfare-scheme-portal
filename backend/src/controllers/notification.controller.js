import {
  getMyNotifications,
  markAsRead,
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
