import { Application } from "../models/application.model.js";
import { Scheme } from "../models/scheme.model.js";
import { User } from "../models/user.model.js";
import { Payment } from "../models/payment.model.js";

export const getDashboardAnalytics = async () => {
  const [
    totalApplications,
    totalUsers,
    totalSchemes,
    totalPayments,

    approvedApplications,
    rejectedApplications,
    paidApplications,

    applicationsByStatus,
    applicationsByMonth,
    usersByRole,
    paymentsByMonth,
    schemesByCategory,
  ] = await Promise.all([
    Application.countDocuments(),

    User.countDocuments(),

    Scheme.countDocuments(),

    Payment.countDocuments(),

    Application.countDocuments({
      status: "APPROVED",
    }),

    Application.countDocuments({
      status: "REJECTED",
    }),

    Application.countDocuments({
      status: "PAID",
    }),

    Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]),

    Application.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
            year: {
              $year: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),

    User.aggregate([
      {
        $group: {
          _id: "$role",

          count: {
            $sum: 1,
          },
        },
      },
    ]),

    Payment.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$paymentDate",
            },

            year: {
              $year: "$paymentDate",
            },
          },

          totalAmount: {
            $sum: "$amount",
          },

          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),

    Scheme.aggregate([
      {
        $lookup: {
          from: "schemecategories",

          localField: "categoryId",

          foreignField: "_id",

          as: "category",
        },
      },

      {
        $unwind: "$category",
      },

      {
        $group: {
          _id: "$category.categoryName",

          count: {
            $sum: 1,
          },
        },
      },
    ]),
  ]);

  return {
    summary: {
      totalApplications,

      totalUsers,

      totalSchemes,

      totalPayments,

      approvedApplications,

      rejectedApplications,

      paidApplications,
    },

    applicationsByStatus,

    applicationsByMonth,

    usersByRole,

    paymentsByMonth,

    schemesByCategory,
  };
};
