import { User } from "../models/user.model.js";

export const getAllUsers = async () => {
  return await User.find().select("-password -refreshToken").sort({
    createdAt: -1,
  });
};

export const getCitizens = async () => {
  return await User.find({
    role: "CITIZEN",
  })
    .select("-password -refreshToken")
    .sort({
      createdAt: -1,
    });
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
