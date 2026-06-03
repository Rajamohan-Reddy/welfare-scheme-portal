import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/scheme.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/", getAll);

router.get("/:id", authenticate, getById);

router.post("/", authenticate, authorize(ROLES.ADMIN), create);

router.put("/:id", authenticate, authorize(ROLES.ADMIN), update);

router.delete("/:id", authenticate, authorize(ROLES.ADMIN), remove);

export default router;
