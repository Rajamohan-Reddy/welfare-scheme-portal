import {
  createApplication,
  getCitizenApplications,
  getApplicationById,
  getApplications,
} from "../services/application.service.js";

import { validateCreateApplication } from "../validators/application.validator.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

import { HTTP_STATUS } from "../constants/http-status.constants.js";

export const applyScheme = async (req, res) => {
  try {
    const validation = validateCreateApplication(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const application = await createApplication({
      citizenId: req.user.userId,

      ...req.body,
    });

    return successResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await getCitizenApplications(req.user.userId);

    return successResponse({
      res,
      data: applications,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const application = await getApplicationById({
      applicationId: req.params.id,

      userId: req.user.userId,

      role: req.user.role,
    });

    return successResponse({
      res,
      data: application,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const data = await getApplications({
      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 10,

      status: req.query.status,

      schemeId: req.query.schemeId,

      citizenId: req.query.citizenId,

      applicationNumber: req.query.applicationNumber,
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
