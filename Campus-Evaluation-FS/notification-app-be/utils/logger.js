import axios from "axios";
import logs from "../data/logs.js";

const logger = async (level, component, message, meta = {}) => {
    const entry = {
        id: Date.now().toString(),
        level,
        component,
        message,
        meta,
        timestamp: new Date().toISOString(),
    };

    logs.unshift(entry);

    if (logs.length > 200) {
        logs.pop();
    }

    if (!process.env.LOGGER_URL) {
        return entry;
    }

    try {
        await axios.post(
            process.env.LOGGER_URL,
            {
                stack: "backend",
                level: level.toLowerCase(),
                package: "middleware",
                message: `${component}: ${message}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.LOGGER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                timeout: 5000,
            }
        );
    } catch (error) {
        entry.remoteError = error.message;
    }

    return entry;
};

export default logger;
