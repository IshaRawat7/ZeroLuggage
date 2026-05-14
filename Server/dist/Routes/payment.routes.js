"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../Controllers/payment.controller");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const router = express_1.default.Router();
// Create Razorpay Order
router.post("/create-order", authMiddleware_1.auth, payment_controller_1.createOrder);
exports.default = router;
