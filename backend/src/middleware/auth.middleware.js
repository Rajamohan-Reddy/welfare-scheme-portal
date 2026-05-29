import { User } from "../models/user.model.js";

import { verifyAccessToken } from "../utils/jwt-helper.js";

import { errorResponse } from "../utils/api-response.js";

import { HTTP_STATUS } from "../constants/http-status.constants.js";

export const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Authentication token missing",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: "Account is inactive",
      });
    }

    req.user = {
      userId: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    return errorResponse({
      res,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid or expired token",
    });
  }
};

export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: "Access denied",
      });
    }

    next();
  };
