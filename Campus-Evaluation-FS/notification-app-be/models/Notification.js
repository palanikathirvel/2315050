import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        notificationType: {
            type: String,
            enum: ["Placement", "Result", "Event"],
            required: true,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

export default Notification;