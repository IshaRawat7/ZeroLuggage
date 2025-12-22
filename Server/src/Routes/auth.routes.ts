import express from "express";
import { registerUser, loginUser, sendOtp, verifyOtp } from "../Controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// OTP routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// JWT logout (optional)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
