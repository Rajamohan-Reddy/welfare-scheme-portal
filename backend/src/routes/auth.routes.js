import express from "express";

import {
  register,
  login,
  logout,
  refreshToken,
  me,
  createAdmin,
  createOfficer,
  getAdmins,
  getOfficers,
  updateUserStatus,
} from "../controllers/auth.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refreshToken);

router.post("/logout", authenticate, logout);

router.post("/create-admin", authenticate, authorize(ROLES.ADMIN), createAdmin);

router.post(
  "/create-officer",
  authenticate,
  authorize(ROLES.ADMIN),
  createOfficer,
);

router.get("/admins", authenticate, authorize(ROLES.ADMIN), getAdmins);

router.get("/officers", authenticate, authorize(ROLES.ADMIN), getOfficers);

router.patch(
  "/:id/status",
  authenticate,
  authorize(ROLES.ADMIN),
  updateUserStatus,
);

router.get("/me", authenticate, me);

export default router;
