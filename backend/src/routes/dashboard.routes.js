import express from "express";

import {
  adminDashboard,
  officerDashboard,
  citizenDashboard,
} from "../controllers/dashboard.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/admin", authenticate, authorize(ROLES.ADMIN), adminDashboard);

router.get(
  "/officer",
  authenticate,
  authorize(ROLES.OFFICER, ROLES.ADMIN),
  officerDashboard,
);

router.get(
  "/citizen",
  authenticate,
  authorize(ROLES.CITIZEN),
  citizenDashboard,
);

export default router;
