import express from "express";
import { createBooking, getMyBookings, getBookingById, cancelBooking } from "../Controllers/booking.controller";
import { auth } from "../Middleware/authMiddleware";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});
const upload = multer({
  storage,
  limits: {
    files: 5, // hard limit
    fileSize: 5 * 1024 * 1024, // optional: 5MB per image
  },
});

router.post(
  "/",
  auth as unknown as express.RequestHandler,
  upload.array("luggagePhotos", 5), // <-- max 5 images
  createBooking
);

router.get("/me", auth as unknown as express.RequestHandler, getMyBookings);
router.get("/", auth as unknown as express.RequestHandler, getMyBookings);
router.get("/:id", auth as unknown as express.RequestHandler, getBookingById);
router.patch("/cancel/:id", auth as unknown as express.RequestHandler, cancelBooking);

export default router;
