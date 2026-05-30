import express from "express";

import {
  documentVerify,
  fieldVerify,
} from "../controllers/verification.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

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

export default router;
