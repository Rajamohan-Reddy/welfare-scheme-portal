import {
  documentVerifyApplication,
  fieldVerifyApplication,
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
