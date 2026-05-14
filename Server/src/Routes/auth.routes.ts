import { Router, Request, Response } from "express";
import { registerUser, loginUser, sendOtp, verifyOtp } from "../Controllers/user.controller";

const router = Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// OTP routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Logout route
router.post("/logout", (req: Request, res: Response) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;