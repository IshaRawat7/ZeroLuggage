import express from "express";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../Controllers/booking.controller";
import { auth } from "../Middleware/authMiddleware";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) =>
    cb(null, path.join(__dirname, "../../uploads")),
  filename: (_req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const upload = multer({
  storage,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024,
  },
});

// CREATE
router.post(
  "/",
  auth as any,
  upload.array("luggagePhotos", 5),
  createBooking
);

//  ONLY ONE route for bookings list
router.get("/me", auth as any, getMyBookings);

// SINGLE BOOKING
router.get("/:id", auth as any, getBookingById);

// CANCEL
router.patch("/cancel/:id", auth as any, cancelBooking);

export default router;