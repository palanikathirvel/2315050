import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notificationRoutes from "./routes/notificationRoutes.js";
import logRoutes from "./routes/logRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Notification Backend Running Successfully"
    });
});

app.use("/api/notifications", notificationRoutes);
app.use("/api/logs", logRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
