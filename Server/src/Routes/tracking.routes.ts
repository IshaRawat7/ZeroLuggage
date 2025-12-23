import express from "express";
import { getBookingTracking } from "../Controllers/tracking.controller";
import { auth } from "../Middleware/authMiddleware";


const router = express.Router();


// Get booking tracking by tracking code
router.get("/:trackingCode", auth as unknown as express.RequestHandler, getBookingTracking);

export default router;
