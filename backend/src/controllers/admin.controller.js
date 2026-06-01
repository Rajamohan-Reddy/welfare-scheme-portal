import {
  getAdminStatistics,
  getRecentActivities,
} from "../services/admin.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const statistics = async (req, res) => {
  try {
    const data = await getAdminStatistics();

    return successResponse({
      res,
      data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const recentActivities = async (req, res) => {
  try {
    const data = await getRecentActivities();

    return successResponse({
      res,
      data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
