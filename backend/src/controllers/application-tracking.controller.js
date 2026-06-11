import { getApplicationTimeline } from "../services/application-tracking.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const getTimeline = async (req, res) => {
  try {
    const timeline = await getApplicationTimeline({
      applicationId: req.params.id,

      userId: req.user.userId,

      role: req.user.role,
    });

    return successResponse({
      res,
      data: timeline,
    });
  } catch (error) {
    const statusCode =
      error.message === "Application not found"
        ? 404
        : error.message === "Access denied"
          ? 403
          : 500;

    return errorResponse({
      res,
      statusCode,
      message: error.message,
    });
  }
};
