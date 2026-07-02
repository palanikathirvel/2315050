import Log from "../models/Log.js";

// Create Log
export const createLog = async (req, res) => {
    try {
        const { level, component, message } = req.body;

        const log = await Log.create({
            level,
            component,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Log Saved Successfully",
            data: log,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Logs
export const getLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({
            timestamp: -1,
        });

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Log
export const deleteLog = async (req, res) => {
    try {
        const log = await Log.findByIdAndDelete(req.params.id);

        if (!log) {
            return res.status(404).json({
                success: false,
                message: "Log Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Log Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};