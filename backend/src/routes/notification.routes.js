import express from "express";

import {
  getMine,
  read,
  unreadCount,
  markAllRead,
  remove,
  removeAll,
} from "../controllers/notification.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

router.get("/my-notifications", authenticate, getMine);

router.get("/unread-count", authenticate, unreadCount);

router.patch("/:id/read", authenticate, read);

router.patch("/mark-all-read", authenticate, markAllRead);

router.delete("/:id", authenticate, remove);

router.delete("/", authenticate, removeAll);

export default router;
