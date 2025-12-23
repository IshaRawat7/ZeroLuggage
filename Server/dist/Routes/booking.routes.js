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
        files: 5, // hard limit
        fileSize: 5 * 1024 * 1024, // optional: 5MB per image
    },
});
router.post("/", authMiddleware_1.auth, upload.array("luggagePhotos", 5), // <-- max 5 images
booking_controller_1.createBooking);
router.get("/me", authMiddleware_1.auth, booking_controller_1.getMyBookings);
router.get("/", authMiddleware_1.auth, booking_controller_1.getMyBookings);
router.get("/:id", authMiddleware_1.auth, booking_controller_1.getBookingById);
router.patch("/cancel/:id", authMiddleware_1.auth, booking_controller_1.cancelBooking);
exports.default = router;
