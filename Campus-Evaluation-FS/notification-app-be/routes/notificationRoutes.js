import express from "express";

import {
    createNotification,
    getNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
    markAsRead,
} from "../controller/notificationController.js";
import loggerMiddleware from "../middleware/loggerMiddleware.js";

const router = express.Router();

// Logging Middleware
router.use(loggerMiddleware);

// Routes
router.post("/", createNotification);

router.get("/", getNotifications);

router.get("/:id", getNotificationById);

router.put("/:id", updateNotification);

router.delete("/:id", deleteNotification);

router.patch("/:id/read", markAsRead);

export default router;
