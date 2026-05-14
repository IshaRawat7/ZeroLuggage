"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tracking_controller_1 = require("../Controllers/tracking.controller");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const router = express_1.default.Router();
//  FIXED: use bookingCode everywhere
router.get("/:bookingCode", authMiddleware_1.auth, tracking_controller_1.getBookingTracking);
exports.default = router;
