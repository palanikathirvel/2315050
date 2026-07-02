import notifications from "../data/notifications.js";
import logger from "../utils/logger.js";

// Create Notification
export const createNotification = async (req, res) => {
    try {
        const { studentId, title, message, notificationType } = req.body;

        if (!studentId || !title || !message || !notificationType) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const notification = {
            id: Date.now().toString(),
            studentId,
            title,
            message,
            notificationType,
            isRead: false,
            createdAt: new Date(),
        };

        notifications.push(notification);

        await logger(
            "INFO",
            "Notification Controller",
            "Notification Created Successfully"
        );

        res.status(201).json({
            success: true,
            message: "Notification Created Successfully",
            data: notification,
        });
    } catch (error) {
        await logger("ERROR", "Notification Controller", error.message);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Notifications
export const getNotifications = async (req, res) => {
    try {
        const { type, status, search } = req.query;

        let filteredNotifications = [...notifications];

        if (type && type !== "All") {
            filteredNotifications = filteredNotifications.filter(
                (item) => item.notificationType === type
            );
        }

        if (status === "read") {
            filteredNotifications = filteredNotifications.filter(
                (item) => item.isRead
            );
        }

        if (status === "unread") {
            filteredNotifications = filteredNotifications.filter(
                (item) => !item.isRead
            );
        }

        if (search) {
            const normalizedSearch = search.toLowerCase();
            filteredNotifications = filteredNotifications.filter(
                (item) =>
                    item.title.toLowerCase().includes(normalizedSearch) ||
                    item.message.toLowerCase().includes(normalizedSearch) ||
                    item.studentId.toLowerCase().includes(normalizedSearch)
            );
        }

        await logger(
            "INFO",
            "Notification Controller",
            "Fetched All Notifications"
        );

        res.status(200).json({
            success: true,
            count: filteredNotifications.length,
            data: filteredNotifications,
        });
    } catch (error) {
        await logger("ERROR", "Notification Controller", error.message);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Notification By ID
export const getNotificationById = async (req, res) => {
    try {
        const notification = notifications.find(
            (item) => item.id === req.params.id
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        await logger(
            "INFO",
            "Notification Controller",
            "Fetched Notification By ID"
        );

        res.status(200).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        await logger("ERROR", "Notification Controller", error.message);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Notification
export const updateNotification = async (req, res) => {
    try {
        const index = notifications.findIndex(
            (item) => item.id === req.params.id
        );

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        notifications[index] = {
            ...notifications[index],
            ...req.body,
        };

        await logger(
            "INFO",
            "Notification Controller",
            "Notification Updated Successfully"
        );

        res.status(200).json({
            success: true,
            message: "Notification Updated Successfully",
            data: notifications[index],
        });
    } catch (error) {
        await logger("ERROR", "Notification Controller", error.message);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
    try {
        const index = notifications.findIndex(
            (item) => item.id === req.params.id
        );

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        notifications.splice(index, 1);

        await logger(
            "INFO",
            "Notification Controller",
            "Notification Deleted Successfully"
        );

        res.status(200).json({
            success: true,
            message: "Notification Deleted Successfully",
        });
    } catch (error) {
        await logger("ERROR", "Notification Controller", error.message);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Mark Notification As Read
export const markAsRead = async (req, res) => {
    try {
        const notification = notifications.find(
            (item) => item.id === req.params.id
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification Not Found",
            });
        }

        notification.isRead = true;

        await logger(
            "INFO",
            "Notification Controller",
            "Notification Marked As Read"
        );

        res.status(200).json({
            success: true,
            message: "Notification Marked As Read",
            data: notification,
        });
    } catch (error) {
        await logger("ERROR", "Notification Controller", error.message);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
