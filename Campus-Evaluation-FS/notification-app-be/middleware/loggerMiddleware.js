import logger from "../utils/logger.js";

const loggerMiddleware = async (req, res, next) => {
    await logger(
        "INFO",
        "Request",
        `${req.method} ${req.originalUrl}`
    );

    next();
};

export default loggerMiddleware;