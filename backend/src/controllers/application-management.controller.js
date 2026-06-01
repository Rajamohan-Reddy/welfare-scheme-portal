import {
  getPendingApplications,
  getDocumentVerifiedApplications,
  getFieldVerifiedApplications,
  getApprovedApplications,
  getRejectedApplications,
} from "../services/application-management.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const pendingApplications = async (req, res) => {
  try {
    const data = await getPendingApplications();

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

export const documentVerifiedApplications = async (req, res) => {
  try {
    const data = await getDocumentVerifiedApplications();

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

export const fieldVerifiedApplications = async (req, res) => {
  try {
    const data = await getFieldVerifiedApplications();

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

export const approvedApplications = async (req, res) => {
  try {
    const data = await getApprovedApplications();

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

export const rejectedApplications = async (req, res) => {
  try {
    const data = await getRejectedApplications();

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
