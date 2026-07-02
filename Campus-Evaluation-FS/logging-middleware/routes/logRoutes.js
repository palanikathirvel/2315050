import express from "express";
import {
    createLog,
    getLogs,
    deleteLog,
} from "../controllers/logController.js";

const router = express.Router();

// Create Log
router.post("/", createLog);

// Get All Logs
router.get("/", getLogs);

// Delete Log
router.delete("/:id", deleteLog);

export default router;