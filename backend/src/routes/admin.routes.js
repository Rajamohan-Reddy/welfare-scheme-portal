import express from "express";

import {
  statistics,
  recentActivities,
} from "../controllers/admin.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/statistics", authenticate, authorize(ROLES.ADMIN), statistics);

router.get(
  "/recent-activities",
  authenticate,
  authorize(ROLES.ADMIN),
  recentActivities,
);

export default router;
