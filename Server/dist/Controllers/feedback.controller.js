"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbacks = exports.submitFeedback = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const asyncHandler_1 = require("../utils/asyncHandler");
// Submit feedback
exports.submitFeedback = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: "Feedback cannot be empty" });
    }
    // ✅ get user from JWT middleware
    const userId = req.user.id;
    const feedback = await prismaClient_1.prisma.feedback.create({
        data: {
            userId,
            message,
        },
    });
    res.json(feedback);
});
// Get all feedbacks (optionally for a user)
exports.getFeedbacks = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const feedbacks = await prismaClient_1.prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true },
    });
    res.json(feedbacks);
});
