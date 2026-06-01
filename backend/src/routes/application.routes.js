import express from "express";

import {
  applyScheme,
  getMyApplications,
  getById,
  getAllApplications,
} from "../controllers/application.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.post("/", authenticate, applyScheme);

router.get("/my-applications", authenticate, getMyApplications);

router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.OFFICER),
  getAllApplications,
);

router.get("/:id", authenticate, getById);

export default router;
