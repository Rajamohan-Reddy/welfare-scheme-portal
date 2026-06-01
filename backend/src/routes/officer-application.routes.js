import express from "express";

import {
  getApplications,
  getApplication,
} from "../controllers/officer-application.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  getApplications,
);

router.get(
  "/:id",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  getApplication,
);

export default router;
