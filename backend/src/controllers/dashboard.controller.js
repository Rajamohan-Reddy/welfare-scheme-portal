import {
  getAdminDashboard,
  getOfficerDashboard,
  getCitizenDashboard,
} from "../services/dashboard.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const adminDashboard = async (req, res) => {
  try {
    const data = await getAdminDashboard();

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

export const officerDashboard = async (req, res) => {
  try {
    const data = await getOfficerDashboard();

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

export const citizenDashboard = async (req, res) => {
  try {
    const data = await getCitizenDashboard(req.user.userId);

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
