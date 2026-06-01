import { AuditLog } from "../models/audit-log.model.js";

export const createAuditLog = async ({
  module,
  action,
  entityId,
  performedBy,
  description,
  metadata = {},
  ipAddress = null,
}) => {
  return await AuditLog.create({
    module,
    action,
    entityId,
    performedBy,
    description,
    metadata,
    ipAddress,
  });
};

export const getAuditLogs = async ({
  module,
  action,
  from,
  to,
  page = 1,
  limit = 20,
}) => {
  const filter = {};

  if (module) {
    filter.module = module;
  }

  if (action) {
    filter.action = action;
  }

  // ADD HERE
  if (from || to) {
    filter.createdAt = {};

    if (from) {
      filter.createdAt.$gte = new Date(from);
    }

    if (to) {
      filter.createdAt.$lte = new Date(to);
    }
  }

  const [logs, total] = await Promise.all([
    AuditLog.find(filter)
      .populate("performedBy", "firstName lastName role")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit),

    AuditLog.countDocuments(filter),
  ]);

  return {
    logs,

    pagination: {
      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getRecentAuditLogs = async (limit = 10) => {
  return await AuditLog.find()
    .populate("performedBy", "firstName lastName role")
    .sort({
      createdAt: -1,
    })
    .limit(limit);
};
