import {
  createScheme,
  getAllSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
} from "../services/scheme.service.js";

import {
  validateCreateScheme,
  validateUpdateScheme,
} from "../validators/scheme.validator.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

import { HTTP_STATUS } from "../constants/http-status.constants.js";

export const create = async (req, res) => {
  try {
    const validation = validateCreateScheme(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const scheme = await createScheme({
      ...req.body,
      createdBy: req.user.userId,
    });

    return successResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: "Scheme created successfully",
      data: scheme,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const schemes = await getAllSchemes();

    return successResponse({
      res,
      data: schemes,
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
    const scheme = await getSchemeById(req.params.id);

    return successResponse({
      res,
      data: scheme,
    });
  } catch (error) {
    return errorResponse({
      res,
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const validation = validateUpdateScheme(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const scheme = await updateScheme(req.params.id, {
      ...req.body,
      updatedBy: req.user.userId,
    });

    return successResponse({
      res,
      message: "Scheme updated successfully",
      data: scheme,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteScheme(req.params.id, req.user.userId);

    return successResponse({
      res,
      message: "Scheme deleted successfully",
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
