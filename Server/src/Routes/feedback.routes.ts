import express from "express";
import { getFeedbacks, submitFeedback } from "../Controllers/feedback.controller";
import { auth } from "../Middleware/authMiddleware";

const router = express.Router();

router.post("/submit",auth as any, submitFeedback);
router.get("/", auth as any, getFeedbacks);

export default router;
