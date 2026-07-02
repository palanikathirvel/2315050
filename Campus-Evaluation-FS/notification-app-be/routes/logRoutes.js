import express from "express";
import { getLogs } from "../controller/logController.js";

const router = express.Router();

router.get("/", getLogs);

export default router;
