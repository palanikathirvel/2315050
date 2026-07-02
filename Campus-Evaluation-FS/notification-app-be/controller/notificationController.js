import Notification from "../models/Notification.js";
import logger from "../utils/logger.js";

// Create Notification
export const createNotification = async (req, res) => {
    try {
        const { studentId, title, message, notificationType } = req.body;

        const notification = await Notification.create({
            studentId,
            title,
            message,
            notificationType,
        });

        await logger(
            "INFO",
            "NotificationController",
            `Notification created for Student ${studentId}`
        );

        res.status(201).json({
            success: true,
            message: "Notification Created Successfully",
            data: notification,
        });
    } catch (error) {
        await logger(
            "ERROR",
            "NotificationController",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({
            createdAt: -1,
        });

        await logger(
            "INFO",
            "NotificationController",
            "Fetched all notifications"
        );

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications,
        });
    } catch (error) {
        await logger(
            "ERROR",
            "NotificationController",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Notification By Id
export const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        await logger(
            "INFO",
            "NotificationController",
            `Fetched notification ${req.params.id}`
        );

        res.status(200).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        await logger(
            "ERROR",
            "NotificationController",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Notification
export const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        await logger(
            "INFO",
            "NotificationController",
            `Updated notification ${req.params.id}`
        );

        res.status(200).json({
            success: true,
            message: "Notification Updated Successfully",
            data: notification,
        });
    } catch (error) {
        await logger(
            "ERROR",
            "NotificationController",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(
            req.params.id
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        await logger(
            "INFO",
            "NotificationController",
            `Deleted notification ${req.params.id}`
        );

        res.status(200).json({
            success: true,
            message: "Notification Deleted Successfully",
        });
    } catch (error) {
        await logger(
            "ERROR",
            "NotificationController",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Mark Notification As Read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        await logger(
            "INFO",
            "NotificationController",
            `Marked notification ${req.params.id} as read`
        );

        res.status(200).json({
            success: true,
            message: "Notification Marked As Read",
            data: notification,
        });
    } catch (error) {
        await logger(
            "ERROR",
            "NotificationController",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};