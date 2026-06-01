import express from "express";

import {
  getUsers,
  getUser,
  statistics,
} from "../controllers/user-management.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/", authenticate, authorize(ROLES.ADMIN), getUsers);

router.get("/statistics", authenticate, authorize(ROLES.ADMIN), statistics);

router.get("/:id", authenticate, authorize(ROLES.ADMIN), getUser);

export default router;
