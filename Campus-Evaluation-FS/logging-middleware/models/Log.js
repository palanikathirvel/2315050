import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            required: true,
            enum: ["INFO", "WARN", "ERROR"],
        },

        component: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

const Log = mongoose.model("Log", logSchema);

export default Log;