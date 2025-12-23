import express from "express";
import { getFeedbacks, submitFeedback } from "../Controllers/feedback.controller";


const router = express.Router();

router.post("/submit", submitFeedback);
router.get("/", getFeedbacks);

export default router;
