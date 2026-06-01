import { getProfile, updateProfile } from "../services/profile.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await getProfile(req.user.userId);

    return successResponse({
      res,
      data: profile,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const profile = await updateProfile(req.user.userId, req.body);

    return successResponse({
      res,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
