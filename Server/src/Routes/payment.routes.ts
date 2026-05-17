import express from "express";
import { createOrder } from "../Controllers/payment.controller";
import { auth } from "../Middleware/authMiddleware";

const router = express.Router();

// Create Razorpay Order
router.post(
  "/create-order",
  auth as unknown as express.RequestHandler,
  createOrder
);
console.log("🔥 PAYMENT ROUTES LOADED");

export default router;