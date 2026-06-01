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
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
