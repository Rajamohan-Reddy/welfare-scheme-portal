import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

import { ROLES } from "../constants/roles.constants.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt-helper.js";

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

  return user;
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

  const userResponse = user.toObject();

  delete userResponse.password;
  delete userResponse.refreshToken;

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });

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

  return user;
};
