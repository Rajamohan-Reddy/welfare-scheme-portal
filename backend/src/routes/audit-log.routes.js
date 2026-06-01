import express from "express";

import { getLogs, getRecentLogs } from "../controllers/audit-log.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/", authenticate, authorize(ROLES.ADMIN), getLogs);

router.get("/recent", authenticate, authorize(ROLES.ADMIN), getRecentLogs);

export default router;
