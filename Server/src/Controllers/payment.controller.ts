import { prisma } from "../prisma/prismaClient";
import { asyncHandler } from "../utils/asyncHandler";

export const createPayment = asyncHandler(async (req: { body: { bookingId: any; amount: any; method: any; }; }, res: { json: (arg0: any) => void; }) => {
  const { bookingId, amount, method } = req.body;

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount,
      method,
      status: "success",
    },
  });

  res.json(payment);
});
