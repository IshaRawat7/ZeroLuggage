import { prisma } from "../prisma/prismaClient";
import { asyncHandler } from "../utils/asyncHandler";

// Submit feedback
export const submitFeedback = asyncHandler(async (req: { body: { userId: any; message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: any) => void; }) => {
  const { userId, message } = req.body;
  if (!message) return res.status(400).json({ message: "Feedback cannot be empty" });

  const feedback = await prisma.feedback.create({
    data: {
      userId,
      message,
    },
  });

  res.json(feedback);
});

// Get all feedbacks (optionally for a user)
export const getFeedbacks = asyncHandler(async (req: any, res: { json: (arg0: any) => void; }) => {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
  res.json(feedbacks);
});
