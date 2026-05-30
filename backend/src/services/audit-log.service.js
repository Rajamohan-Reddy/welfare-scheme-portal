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
