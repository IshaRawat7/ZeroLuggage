"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../Controllers/booking.controller");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, path_1.default.join(__dirname, "../../uploads")),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        files: 5,
        fileSize: 5 * 1024 * 1024,
    },
});
// CREATE
router.post("/", authMiddleware_1.auth, upload.array("luggagePhotos", 5), booking_controller_1.createBooking);
//  ONLY ONE route for bookings list
router.get("/me", authMiddleware_1.auth, booking_controller_1.getMyBookings);
// SINGLE BOOKING
router.get("/:id", authMiddleware_1.auth, booking_controller_1.getBookingById);
// CANCEL
router.patch("/cancel/:id", authMiddleware_1.auth, booking_controller_1.cancelBooking);
exports.default = router;
