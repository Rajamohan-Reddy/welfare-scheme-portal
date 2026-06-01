import express from "express";

import { analytics } from "../controllers/dashboard-analytics.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/", authenticate, authorize(ROLES.ADMIN, ROLES.OFFICER), analytics);

export default router;
