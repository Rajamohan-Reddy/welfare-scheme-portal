import {
  getProfile,
  updateProfile,
  updateAddress,
  updateProfileImage,
  changePassword,
} from "../services/profile.service.js";

import { validateChangePassword } from "../validators/profile.validator.js";

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

export const updateMyAddress = async (req, res) => {
  try {
    const profile = await updateAddress(req.user.userId, req.body);

    return successResponse({
      res,
      message: "Address updated successfully",
      data: profile,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const updateMyProfileImage = async (req, res) => {
  try {
    const profile = await updateProfileImage(
      req.user.userId,
      req.body.profileImage,
    );

    return successResponse({
      res,
      message: "Profile image updated successfully",
      data: profile,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const changeMyPassword = async (req, res) => {
  try {
    const validation = validateChangePassword(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: 400,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    await changePassword({
      userId: req.user.userId,

      currentPassword: req.body.currentPassword,

      newPassword: req.body.newPassword,
    });

    return successResponse({
      res,
      message: "Password changed successfully",
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
