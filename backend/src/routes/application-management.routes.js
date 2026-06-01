import express from "express";

import {
  pendingApplications,
  documentVerifiedApplications,
  fieldVerifiedApplications,
  approvedApplications,
  rejectedApplications,
} from "../controllers/application-management.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get(
  "/pending",
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
  "/approved",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  approvedApplications,
);

router.get(
  "/rejected",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  rejectedApplications,
);

export default router;
