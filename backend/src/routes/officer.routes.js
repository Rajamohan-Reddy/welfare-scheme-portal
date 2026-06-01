import express from "express";

import {
  pendingApplications,
  documentVerifiedApplications,
  fieldVerifiedApplications,
  statistics,
} from "../controllers/officer.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get(
  "/pending-applications",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  pendingApplications,
);

router.get(
  "/document-verified",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  documentVerifiedApplications,
);

router.get(
  "/field-verified",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  fieldVerifiedApplications,
);

router.get(
  "/statistics",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  statistics,
);

export default router;
