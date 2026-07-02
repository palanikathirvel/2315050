import logs from "../data/logs.js";

export const getLogs = (req, res) => {
    res.status(200).json({
        success: true,
        count: logs.length,
        data: logs,
    });
};
