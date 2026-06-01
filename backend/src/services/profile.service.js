import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const calculateProfileCompletion = (user) => {
  const fields = [
    user.firstName,
    user.lastName,
    user.email,
    user.phoneNumber,
    user.aadhaarNumber,
    user.dateOfBirth,
    user.gender,
    user.address?.houseNo,
    user.address?.street,
    user.address?.village,
    user.address?.mandal,
    user.address?.district,
    user.address?.state,
    user.address?.pincode,
  ];

  const completedFields = fields.filter(Boolean).length;

  return Math.round((completedFields / fields.length) * 100);
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  const profile = user.toObject();

  profile.profileCompletion = calculateProfileCompletion(user);

  return profile;
};

export const updateProfile = async (userId, payload) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumber: payload.phoneNumber,
      aadhaarNumber: payload.aadhaarNumber,
      dateOfBirth: payload.dateOfBirth,
      gender: payload.gender,
      address: payload.address,
      profileImage: payload.profileImage,

      isProfileCompleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  const profile = user.toObject();

  profile.profileCompletion = calculateProfileCompletion(user);

  return profile;
};

export const updateAddress = async (userId, address) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      address,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateProfileImage = async (userId, profileImage) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      profileImage,
    },
    {
      new: true,
    },
  ).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(currentPassword, user.password);

  if (!isValidPassword) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  user.passwordChangedAt = new Date();

  await user.save();

  return true;
};
