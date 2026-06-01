import { getDashboardAnalytics } from "../services/dashboard-analytics.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const analytics = async (req, res) => {
  try {
    const data = await getDashboardAnalytics();

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
