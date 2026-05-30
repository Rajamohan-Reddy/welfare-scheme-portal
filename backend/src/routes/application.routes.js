import express from "express";

import {
  applyScheme,
  getMyApplications,
  getById,
} from "../controllers/application.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, applyScheme);

router.get("/my-applications", authenticate, getMyApplications);

router.get("/:id", authenticate, getById);

export default router;
