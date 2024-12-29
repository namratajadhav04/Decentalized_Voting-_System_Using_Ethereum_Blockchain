import express from "express";
import { submitFeedback } from "../controllers/feedbackController"; // Import the feedback controller

const router = express.Router();

// POST endpoint to submit feedback
router.post("/", submitFeedback);

export default router;
