import express from "express";

import {
  getMyProfile,
  updateMyProfile,
  updateMyAddress,
  updateMyProfileImage,
  changeMyPassword,
} from "../controllers/profile.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticate, getMyProfile);

router.put("/me", authenticate, updateMyProfile);

router.patch("/address", authenticate, updateMyAddress);

router.patch("/photo", authenticate, updateMyProfileImage);

router.patch("/change-password", authenticate, changeMyPassword);

export default router;
