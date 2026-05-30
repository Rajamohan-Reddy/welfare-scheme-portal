import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";

import { ROLES } from "../constants/roles.constants.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt-helper.js";

import { createAuditLog } from "./audit-log.service.js";

import { AUDIT_MODULES, AUDIT_ACTIONS } from "../constants/audit.constants.js";

export const registerCitizen = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
}) => {
  const existingEmail = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingEmail) {
    throw new Error("User already exists");
  }

  const existingPhone = await User.findOne({
    phoneNumber,
  });

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phoneNumber,
    password: hashedPassword,
    role: ROLES.CITIZEN,
  });

  const userResponse = {
    _id: user._id,

    firstName: user.firstName,

    lastName: user.lastName,

    email: user.email,

    phoneNumber: user.phoneNumber,

    role: user.role,

    isActive: user.isActive,

    isProfileCompleted: user.isProfileCompleted,

    createdAt: user.createdAt,

    updatedAt: user.updatedAt,
  };

  return userResponse;
};

export const loginUser = async ({ identifier, password }) => {
  const user = await User.findOne({
    $or: [
      {
        email: identifier.toLowerCase(),
      },
      {
        phoneNumber: identifier,
      },
    ],
  }).select("+password +refreshToken");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.isActive) {
    throw new Error("Account is inactive");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;

  user.lastLoginAt = new Date();

  await user.save();

  await createAuditLog({
    module: AUDIT_MODULES.AUTH,

    action: AUDIT_ACTIONS.LOGIN,

    entityId: user._id,

    performedBy: user._id,

    description: `${user.email} logged in`,
  });

  const userResponse = {
    _id: user._id,

    firstName: user.firstName,

    lastName: user.lastName,

    email: user.email,

    phoneNumber: user.phoneNumber,

    role: user.role,

    isActive: user.isActive,

    isProfileCompleted: user.isProfileCompleted,

    lastLoginAt: user.lastLoginAt,

    createdAt: user.createdAt,

    updatedAt: user.updatedAt,
  };

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      refreshToken: null,
    },
    {
      new: true,
    },
  );

  if (user) {
    await createAuditLog({
      module: AUDIT_MODULES.AUTH,

      action: AUDIT_ACTIONS.LOGOUT,

      entityId: user._id,

      performedBy: user._id,

      description: `${user.email} logged out`,
    });
  }

  return true;
};

export const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.userId).select("+refreshToken");

  if (!user) {
    throw new Error("Invalid refresh token");
  }

  if (user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  return {
    accessToken,
  };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    _id: user._id,

    firstName: user.firstName,

    lastName: user.lastName,

    email: user.email,

    phoneNumber: user.phoneNumber,

    role: user.role,

    isActive: user.isActive,

    isProfileCompleted: user.isProfileCompleted,

    lastLoginAt: user.lastLoginAt,

    createdAt: user.createdAt,

    updatedAt: user.updatedAt,
  };
};

//we can return this way also
// const user = await User.create({
//   firstName,
//   lastName,
//   email: email.toLowerCase(),
//   phoneNumber,
//   password: hashedPassword,
//   role: ROLES.CITIZEN,
// });

// const userResponse =
//   user.toObject();

// delete userResponse.password;
// delete userResponse.refreshToken;

// return userResponse;
