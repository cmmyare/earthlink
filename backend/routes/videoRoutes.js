import express from "express";
import { generateVideo, getVideoJobStatus } from "../controllers/videoController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// All video routes require authentication
router.use(authenticate);
router.post("/generate", generateVideo);
router.get("/:jobId", getVideoJobStatus);

export default router;
