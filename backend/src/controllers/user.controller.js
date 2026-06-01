import {
  getAllUsers,
  getCitizens,
  getUserById,
} from "../services/user.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const users = async (req, res) => {
  try {
    const data = await getAllUsers();

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

export const citizens = async (req, res) => {
  try {
    const data = await getCitizens();

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

export const user = async (req, res) => {
  try {
    const data = await getUserById(req.params.id);

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
