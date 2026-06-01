import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";

import { ROLES } from "../constants/roles.constants.js";

import { AUTH_MESSAGES } from "../constants/auth-messages.constants.js";

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

export const createAdminAccount = async (payload, createdBy) => {
  return await createStaffAccount(payload, ROLES.ADMIN, createdBy);
};

export const createOfficerAccount = async (payload, createdBy) => {
  return await createStaffAccount(payload, ROLES.OFFICER, createdBy);
};

const createStaffAccount = async (
  { firstName, lastName, email, phoneNumber, password },
  role,
  createdBy,
) => {
  const existingEmail = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingEmail) {
    throw new Error(AUTH_MESSAGES.USER_ALREADY_EXISTS);
  }

  const existingPhone = await User.findOne({
    phoneNumber,
  });

  if (existingPhone) {
    throw new Error(AUTH_MESSAGES.PHONE_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phoneNumber,
    password: hashedPassword,
    role,
    createdBy,
  });

  await createAuditLog({
    module: AUDIT_MODULES.USER,
    action: AUDIT_ACTIONS.CREATE,
    entityId: user._id,
    performedBy: createdBy,
    description: `${role} account created`,
  });

  return {
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
};

export const getAdminsList = async () => {
  return await User.find({
    role: ROLES.ADMIN,
  })
    .select("-password -refreshToken")
    .sort({
      createdAt: -1,
    });
};

export const getOfficersList = async () => {
  return await User.find({
    role: ROLES.OFFICER,
  })
    .select("-password -refreshToken")
    .sort({
      createdAt: -1,
    });
};

export const updateAccountStatus = async (userId, isActive, performedBy) => {
  const targetUser = await User.findById(userId);

  if (!targetUser) {
    throw new Error("User not found");
  }

  // Prevent deactivating another admin
  if (
    targetUser.role === ROLES.ADMIN &&
    targetUser._id.toString() !== performedBy.toString()
  ) {
    throw new Error("Cannot modify another admin account");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      isActive,
      deactivatedAt: isActive ? null : new Date(),
    },
    {
      new: true,
    },
  );

  await createAuditLog({
    module: AUDIT_MODULES.USER,

    action: AUDIT_ACTIONS.UPDATE,

    entityId: user._id,

    performedBy,

    description: `Account ${isActive ? "activated" : "deactivated"}`,
  });

  return user;
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
