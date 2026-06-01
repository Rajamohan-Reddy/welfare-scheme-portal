import express from "express";

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/profile.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticate, getMyProfile);

router.put("/me", authenticate, updateMyProfile);

export default router;
