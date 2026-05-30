import express from "express";

import { exportApplications } from "../controllers/report.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get(
  "/applications",
  authenticate,
  authorize(ROLES.ADMIN),
  exportApplications,
);

export default router;
