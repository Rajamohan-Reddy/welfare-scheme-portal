import express from "express";

import {
  processPayment,
  getPayments,
  getPayment,
  analytics,
} from "../controllers/payment.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/", authenticate, authorize(ROLES.ADMIN), getPayments);

router.get("/:id", authenticate, authorize(ROLES.ADMIN), getPayment);

router.post(
  "/release/:applicationId",
  authenticate,
  authorize(ROLES.ADMIN),
  processPayment,
);

router.get("/analytics", authenticate, authorize(ROLES.ADMIN), analytics);

export default router;
