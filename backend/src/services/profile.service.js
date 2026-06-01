import { User } from "../models/user.model.js";

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
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
    },
  ).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
