import {
  getPendingApplications,
  getDocumentVerifiedApplications,
  getFieldVerifiedApplications,
  getOfficerStatistics,
} from "../services/officer.service.js";

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

export const statistics = async (req, res) => {
  try {
    const data = await getOfficerStatistics();

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
