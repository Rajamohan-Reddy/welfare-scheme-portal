import { User } from "../models/user.model.js";
import { Scheme } from "../models/scheme.model.js";
import { Application } from "../models/application.model.js";
import { Payment } from "../models/payment.model.js";
import { AuditLog } from "../models/audit-log.model.js";

import { APPLICATION_STATUS } from "../constants/application.constants.js";

export const getAdminStatistics = async () => {
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

export const getRecentActivities = async () => {
  const [recentApplications, recentPayments, recentUsers, recentAuditLogs] =
    await Promise.all([
      Application.find()
        .populate("citizenId", "firstName lastName")
        .populate("schemeId", "schemeName")
        .sort({
          createdAt: -1,
        })
        .limit(5),

      Payment.find()
        .populate("beneficiaryId", "firstName lastName")
        .sort({
          createdAt: -1,
        })
        .limit(5),

      User.find()
        .select("firstName lastName role createdAt")
        .sort({
          createdAt: -1,
        })
        .limit(5),

      AuditLog.find()
        .populate("performedBy", "firstName lastName role")
        .sort({
          createdAt: -1,
        })
        .limit(10),
    ]);

  return {
    recentApplications,
    recentPayments,
    recentUsers,
    recentAuditLogs,
  };
};
