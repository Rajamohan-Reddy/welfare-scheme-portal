import express from "express";

import {
  documentVerify,
  fieldVerify,
  approve,
  reject,
  pendingQueue,
  documentVerifiedQueue,
  fieldVerifiedQueue,
} from "../controllers/verification.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get(
  "/pending",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  pendingQueue,
);

router.get(
  "/document-verified",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  documentVerifiedQueue,
);

router.get(
  "/field-verified",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  fieldVerifiedQueue,
);

router.patch(
  "/:id/document-verify",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  documentVerify,
);

router.patch(
  "/:id/field-verify",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  fieldVerify,
);

router.patch("/:id/approve", authenticate, authorize(ROLES.ADMIN), approve);

router.patch("/:id/reject", authenticate, authorize(ROLES.ADMIN), reject);

export default router;
