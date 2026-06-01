import { User } from "../models/user.model.js";
import { ROLES } from "../constants/roles.constants.js";

export const getAllUsers = async ({
  page = 1,
  limit = 20,
  role,
  isActive,
  search,
}) => {
  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive === "true";
  }

  if (search) {
    filter.$or = [
      {
        firstName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        phoneNumber: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password -refreshToken")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit),

    User.countDocuments(filter),
  ]);

  return {
    users,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
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
