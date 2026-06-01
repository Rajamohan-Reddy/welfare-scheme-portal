import express from "express";

import { users, citizens, user } from "../controllers/user.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/", authenticate, authorize(ROLES.ADMIN), users);

router.get("/citizens", authenticate, authorize(ROLES.ADMIN), citizens);

router.get("/:id", authenticate, authorize(ROLES.ADMIN), user);

export default router;
