import {
  registerCitizen,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  createAdminAccount,
  createOfficerAccount,
  getAdminsList,
  getOfficersList,
  updateAccountStatus,
} from "../services/auth.service.js";

import {
  validateRegister,
  validateLogin,
  validateCreateStaff,
} from "../validators/auth.validator.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

import { HTTP_STATUS } from "../constants/http-status.constants.js";

import { AUTH_MESSAGES } from "../constants/auth-messages.constants.js";

import { COOKIE_NAMES } from "../constants/cookie.constants.js";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  clearCookieOptions,
} from "../utils/cookie-options.js";

export const register = async (req, res) => {
  try {
    const validation = validateRegister(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const user = await registerCitizen(req.body);

    return successResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: AUTH_MESSAGES.REGISTER_SUCCESS,
      data: user,
    });
  } catch (error) {
    return errorResponse({
      res,
      statusCode: HTTP_STATUS.CONFLICT,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const validation = validateLogin(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { user, accessToken, refreshToken } = await loginUser(req.body);

    res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
    res.cookie(
      COOKIE_NAMES.REFRESH_TOKEN,
      refreshToken,
      refreshTokenCookieOptions,
    );

    return successResponse({
      res,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: {
        user,
      },
    });
  } catch (error) {
    return errorResponse({
      res,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutUser(req.user.userId);

    res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, clearCookieOptions);
    res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, clearCookieOptions);

    return successResponse({
      res,
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];

    if (!refreshToken) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: AUTH_MESSAGES.UNAUTHORIZED,
      });
    }

    const result = await refreshAccessToken(refreshToken);

    res.cookie(
      COOKIE_NAMES.ACCESS_TOKEN,
      result.accessToken,
      accessTokenCookieOptions,
    );

    return successResponse({
      res,
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    return errorResponse({
      res,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: error.message,
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await getCurrentUser(req.user.userId);

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

export const createAdmin = async (req, res) => {
  try {
    const validation = validateCreateStaff(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const admin = await createAdminAccount(req.body, req.user.userId);

    return successResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: AUTH_MESSAGES.ADMIN_CREATED,
      data: admin,
    });
  } catch (error) {
    return errorResponse({
      res,
      statusCode: HTTP_STATUS.CONFLICT,
      message: error.message,
    });
  }
};

export const createOfficer = async (req, res) => {
  try {
    const validation = validateCreateStaff(req.body);

    if (!validation.isValid) {
      return errorResponse({
        res,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const officer = await createOfficerAccount(req.body, req.user.userId);

    return successResponse({
      res,
      statusCode: HTTP_STATUS.CREATED,
      message: AUTH_MESSAGES.OFFICER_CREATED,
      data: officer,
    });
  } catch (error) {
    return errorResponse({
      res,
      statusCode: HTTP_STATUS.CONFLICT,
      message: error.message,
    });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await getAdminsList();

    return successResponse({
      res,
      data: admins,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getOfficers = async (req, res) => {
  try {
    const officers = await getOfficersList();

    return successResponse({
      res,
      data: officers,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const user = await updateAccountStatus(
      req.params.id,
      req.body.isActive,
      req.user.userId,
    );

    return successResponse({
      res,
      message: "Status updated successfully",
      data: user,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
