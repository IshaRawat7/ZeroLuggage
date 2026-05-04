"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const prismaClient_1 = require("../prisma/prismaClient");
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const createOrder = async (req, res) => {
    try {
        const { amount, bookingId } = req.body;
        const userId = req.user?.id;
        // Validate input
        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        //  Optional: validate booking exists
        if (bookingId) {
            const booking = await prismaClient_1.prisma.booking.findUnique({
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
        const payment = await prismaClient_1.prisma.payment.create({
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
    }
    catch (err) {
        console.error("Create Order Error:", err);
        res.status(500).json({
            success: false,
            error: err.message || "Order creation failed",
        });
    }
};
exports.createOrder = createOrder;
