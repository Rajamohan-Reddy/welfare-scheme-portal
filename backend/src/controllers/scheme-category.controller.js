import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/scheme-category.service.js";

import { validateCreateCategory } from "../validators/scheme-category.validator.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const create = async (req, res) => {
  try {
    const validation = validateCreateCategory(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: 400,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const category = await createCategory(req.body);

    return successResponse({
      res,
      statusCode: 201,
      message: "Category created successfully",
      data: category,
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
    const categories = await getAllCategories();

    return successResponse({
      res,
      data: categories,
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
    const category = await getCategoryById(req.params.id);

    return successResponse({
      res,
      data: category,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);

    return successResponse({
      res,
      message: "Category updated successfully",
      data: category,
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
    await deleteCategory(req.params.id);

    return successResponse({
      res,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
