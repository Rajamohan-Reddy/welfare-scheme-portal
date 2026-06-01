import express from "express";

import { getTimeline } from "../controllers/application-tracking.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id/timeline", authenticate, getTimeline);

export default router;
