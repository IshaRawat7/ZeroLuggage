"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controllers/user.controller");
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
// OTP routes
router.post("/send-otp", user_controller_1.sendOtp);
router.post("/verify-otp", user_controller_1.verifyOtp);
// JWT logout (optional)
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});
exports.default = router;
