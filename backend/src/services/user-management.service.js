import { User } from "../models/user.model.js";
import { ROLES } from "../constants/roles.constants.js";

export const getAllUsers = async ({ page = 1, limit = 20, role, isActive }) => {
  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive === "true";
  }

  const users = await User.find(filter)
    .select("-password -refreshToken")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await User.countDocuments(filter);

  return {
    users,
    total,
    page,
    limit,
  };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUserStatistics = async () => {
  const [
    totalUsers,
    totalCitizens,
    totalOfficers,
    totalAdmins,
    activeUsers,
    inactiveUsers,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      role: ROLES.CITIZEN,
    }),

    User.countDocuments({
      role: ROLES.OFFICER,
    }),

    User.countDocuments({
      role: ROLES.ADMIN,
    }),

    User.countDocuments({
      isActive: true,
    }),

    User.countDocuments({
      isActive: false,
    }),
  ]);

  return {
    totalUsers,
    totalCitizens,
    totalOfficers,
    totalAdmins,
    activeUsers,
    inactiveUsers,
  };
};
