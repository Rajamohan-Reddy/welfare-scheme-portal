import {
  getAllUsers,
  getUserById,
  getUserStatistics,
} from "../services/user-management.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers({
      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 20,

      role: req.query.role,

      isActive: req.query.isActive,

      search: req.query.search,
    });

    return successResponse({
      res,
      data: users,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    return successResponse({
      res,
      data: user,
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
    const data = await getUserStatistics();

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
