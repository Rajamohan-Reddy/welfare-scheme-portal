import {
  getAdminDashboard,
  getOfficerDashboard,
  getCitizenDashboard,
  getApplicationStatusChart,
  getMonthlyApplicationsChart,
  getSchemeWiseApplications,
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

export const applicationStatusChart = async (req, res) => {
  try {
    const data = await getApplicationStatusChart();

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

export const monthlyApplicationsChart = async (req, res) => {
  try {
    const data = await getMonthlyApplicationsChart();

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

export const schemeWiseApplications = async (req, res) => {
  try {
    const data = await getSchemeWiseApplications();

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
