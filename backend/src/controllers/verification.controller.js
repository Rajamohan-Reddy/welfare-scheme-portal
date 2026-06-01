import {
  documentVerifyApplication,
  fieldVerifyApplication,
  getPendingVerificationApplications,
  getDocumentVerifiedApplications,
  getFieldVerifiedApplications,
} from "../services/verification.service.js";

import {
  approveApplication,
  rejectApplication,
} from "../services/verification.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const documentVerify = async (req, res) => {
  try {
    const application = await documentVerifyApplication({
      applicationId: req.params.id,

      officerId: req.user.userId,

      remarks: req.body.remarks,
    });

    return successResponse({
      res,
      message: "Document verification completed",
      data: application,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const fieldVerify = async (req, res) => {
  try {
    const application = await fieldVerifyApplication({
      applicationId: req.params.id,

      officerId: req.user.userId,

      remarks: req.body.remarks,
    });

    return successResponse({
      res,
      message: "Field verification completed",
      data: application,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const approve = async (req, res) => {
  try {
    const application = await approveApplication({
      applicationId: req.params.id,

      adminId: req.user.userId,

      remarks: req.body.remarks,
    });

    return successResponse({
      res,
      message: "Application approved successfully",
      data: application,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const reject = async (req, res) => {
  try {
    const application = await rejectApplication({
      applicationId: req.params.id,

      adminId: req.user.userId,

      remarks: req.body.remarks,
    });

    return successResponse({
      res,
      message: "Application rejected successfully",
      data: application,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const pendingQueue = async (req, res) => {
  try {
    const data = await getPendingVerificationApplications({
      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 10,
    });

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

export const documentVerifiedQueue = async (req, res) => {
  try {
    const data = await getDocumentVerifiedApplications({
      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 10,
    });

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

export const fieldVerifiedQueue = async (req, res) => {
  try {
    const data = await getFieldVerifiedApplications({
      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 10,
    });

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
