import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import logRoutes from "./routes/logRoutes.js";

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Logging Middleware API Running"
    });
});

// Routes
app.use("/api/logs", logRoutes);


// Correct
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Logging Server Running on Port ${PORT}`);
});