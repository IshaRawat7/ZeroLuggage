import { Request, Response } from "express";
import Razorpay from "razorpay";
import { prisma } from "../prisma/prismaClient";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, bookingId } = req.body;
    const userId = (req as any).user?.id;

    // Validate input
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //  Optional: validate booking exists
    if (bookingId) {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
    }

    //  Create Razorpay order
    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    //  Save payment in DB (multiple allowed now)
    const payment = await prisma.payment.create({
      data: {
        amount,
        razorpayOrderId: order.id,
        userId,
        bookingId: bookingId || null,
        status: "PENDING",
      },
    });

    // Send clean response
    res.status(200).json({
      success: true,
      order,
      paymentId: payment.id,
    });

  } catch (err: any) {
    console.error("Create Order Error:", err);

    res.status(500).json({
      success: false,
      error: err.message || "Order creation failed",
    });
  }
};