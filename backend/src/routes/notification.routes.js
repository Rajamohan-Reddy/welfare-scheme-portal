import express from "express";

import { getMine, read } from "../controllers/notification.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my-notifications", authenticate, getMine);

router.patch("/:id/read", authenticate, read);

export default router;
