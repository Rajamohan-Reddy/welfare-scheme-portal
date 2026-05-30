import express from "express";

import { upload } from "../config/multer.config.js";

import { uploadFile } from "../controllers/upload.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/single", authenticate, upload.single("file"), uploadFile);

export default router;
