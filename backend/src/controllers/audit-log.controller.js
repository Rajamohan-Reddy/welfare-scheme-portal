import {
  getAuditLogs,
  getRecentAuditLogs,
} from "../services/audit-log.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await getAuditLogs({
      module: req.query.module,

      action: req.query.action,

      from: req.query.from,

      to: req.query.to,

      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 20,
    });

    return successResponse({
      res,
      data: logs,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getRecentLogs = async (req, res) => {
  try {
    const logs = await getRecentAuditLogs();

    return successResponse({
      res,
      data: logs,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
