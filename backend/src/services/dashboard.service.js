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
