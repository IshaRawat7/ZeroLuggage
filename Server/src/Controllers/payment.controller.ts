import { Request, Response } from "express";
import Razorpay from "razorpay";
import { prisma } from "../prisma/prismaClient";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    // 🔥 ALWAYS calculate amount from DB (NEVER frontend)
    let amount = 0;

    if (bookingId) {
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          userId, // 🔐 IMPORTANT: ownership check
        },
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          error: "Booking not found",
        });
      }

      amount = booking.estimatedFare;
    } else {
      return res.status(400).json({
        success: false,
        error: "BookingId required",
      });
    }

    // 🔥 Razorpay expects paise
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await prisma.payment.create({
      data: {
        amount,
        razorpayOrderId: order.id,
        userId,
        bookingId,
        status: "PENDING",
      },
    });

    return res.status(200).json({
      success: true,
      order,
      paymentId: payment.id,
    });
  } catch (err: any) {
    console.error("Create Order Error:", err);

    return res.status(500).json({
      success: false,
      error: err.message || "Order creation failed",
    });
  }
};