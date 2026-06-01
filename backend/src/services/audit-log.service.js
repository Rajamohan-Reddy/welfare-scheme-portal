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

  return await AuditLog.find(filter)
    .populate("performedBy", "firstName lastName role")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getRecentAuditLogs = async (limit = 10) => {
  return await AuditLog.find()
    .populate("performedBy", "firstName lastName role")
    .sort({
      createdAt: -1,
    })
    .limit(limit);
};
