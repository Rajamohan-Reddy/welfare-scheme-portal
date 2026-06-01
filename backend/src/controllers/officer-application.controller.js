import {
  getOfficerApplications,
  getOfficerApplicationById,
} from "../services/officer-application.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const getApplications = async (req, res) => {
  try {
    const applications = await getOfficerApplications({
      status: req.query.status,

      search: req.query.search,
    });

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

export const getApplication = async (req, res) => {
  try {
    const application = await getOfficerApplicationById(req.params.id);

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
