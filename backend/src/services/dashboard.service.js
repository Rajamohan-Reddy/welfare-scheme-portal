import { User } from "../models/user.model.js";

import { Scheme } from "../models/scheme.model.js";

import { Application } from "../models/application.model.js";

import { Payment } from "../models/payment.model.js";

import { APPLICATION_STATUS } from "../constants/application.constants.js";

export const getAdminDashboard = async () => {
  const [
    totalUsers,

    totalSchemes,

    totalApplications,

    approvedApplications,

    rejectedApplications,

    pendingApplications,

    totalPayments,
  ] = await Promise.all([
    User.countDocuments(),

    Scheme.countDocuments(),

    Application.countDocuments(),

    Application.countDocuments({
      status: APPLICATION_STATUS.APPROVED,
    }),

    Application.countDocuments({
      status: APPLICATION_STATUS.REJECTED,
    }),

    Application.countDocuments({
      status: APPLICATION_STATUS.SUBMITTED,
    }),

    Payment.countDocuments(),
  ]);

  return {
    totalUsers,

    totalSchemes,

    totalApplications,

    approvedApplications,

    rejectedApplications,

    pendingApplications,

    totalPayments,
  };
};

export const getOfficerDashboard = async () => {
  const [pendingVerification, documentVerified, fieldVerified] =
    await Promise.all([
      Application.countDocuments({
        status: "SUBMITTED",
      }),

      Application.countDocuments({
        status: "DOCUMENT_VERIFIED",
      }),

      Application.countDocuments({
        status: "FIELD_VERIFIED",
      }),
    ]);

  return {
    pendingVerification,

    documentVerified,

    fieldVerified,
  };
};

export const getCitizenDashboard = async (citizenId) => {
  const [totalApplications, approvedApplications, rejectedApplications] =
    await Promise.all([
      Application.countDocuments({
        citizenId,
      }),

      Application.countDocuments({
        citizenId,

        status: "APPROVED",
      }),

      Application.countDocuments({
        citizenId,

        status: "REJECTED",
      }),
    ]);

  return {
    totalApplications,

    approvedApplications,

    rejectedApplications,
  };
};

export const getApplicationStatusChart = async () => {
  const [submitted, documentVerified, fieldVerified, approved, rejected, paid] =
    await Promise.all([
      Application.countDocuments({
        status: "SUBMITTED",
      }),

      Application.countDocuments({
        status: "DOCUMENT_VERIFIED",
      }),

      Application.countDocuments({
        status: "FIELD_VERIFIED",
      }),

      Application.countDocuments({
        status: "APPROVED",
      }),

      Application.countDocuments({
        status: "REJECTED",
      }),

      Application.countDocuments({
        status: "PAID",
      }),
    ]);

  return [
    {
      name: "Submitted",
      value: submitted,
    },

    {
      name: "Document Verified",
      value: documentVerified,
    },

    {
      name: "Field Verified",
      value: fieldVerified,
    },

    {
      name: "Approved",
      value: approved,
    },

    {
      name: "Rejected",
      value: rejected,
    },

    {
      name: "Paid",
      value: paid,
    },
  ];
};
export const getMonthlyApplicationsChart = async () => {
  const result = await Application.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
        },

        applications: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return result.map((item) => ({
    month: monthNames[item._id.month],

    applications: item.applications,
  }));
};

export const getSchemeWiseApplications = async () => {
  return await Application.aggregate([
    {
      $lookup: {
        from: "schemes",

        localField: "schemeId",

        foreignField: "_id",

        as: "scheme",
      },
    },

    {
      $unwind: "$scheme",
    },

    {
      $group: {
        _id: "$scheme.schemeName",

        applications: {
          $sum: 1,
        },
      },
    },

    {
      $project: {
        _id: 0,

        scheme: "$_id",

        applications: 1,
      },
    },

    {
      $sort: {
        applications: -1,
      },
    },
  ]);
};
