import logger from "../utils/logger.js";

const loggerMiddleware = async (req, res, next) => {
    const startTime = Date.now();

    await logger("INFO", "Request", `${req.method} ${req.originalUrl}`, {
        body: req.body,
        query: req.query,
    });

    res.on("finish", async () => {
        await logger(
            res.statusCode >= 400 ? "ERROR" : "INFO",
            "Response",
            `${req.method} ${req.originalUrl} -> ${res.statusCode}`,
            {
                durationMs: Date.now() - startTime,
            }
        );
    });

    next();
};

export default loggerMiddleware;
