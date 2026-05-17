"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../Controllers/user.controller");
const router = (0, express_1.Router)();
// Register user
router.post("/register", user_controller_1.registerUser);
// Login user
router.post("/login", user_controller_1.loginUser);
// OTP routes
router.post("/send-otp", user_controller_1.sendOtp);
router.post("/verify-otp", user_controller_1.verifyOtp);
// Logout route
router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});
exports.default = router;
