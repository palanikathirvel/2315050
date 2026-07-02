import axios from "axios";

const logger = async (
    level,
    component,
    message
) => {
    try {
        const logData = {
            level,
            component,
            message,
            timestamp: new Date().toISOString(),
        };

        // Replace with your actual logging service endpoint
        await axios.post(
            process.env.LOGGER_URL,
            logData
        );
    } catch (error) {
        console.log("Logger Error");
    }
};

export default logger;