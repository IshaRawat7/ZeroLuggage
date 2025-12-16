import { Response } from "express";
import { prisma } from "../prisma/prismaClient";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthenticatedRequest } from "../Middleware/authMiddleware";

/**
 * CREATE BOOKING
 * 
 */
const toInt = (value: any, defaultValue = 0) => {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};
export const createBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const {
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
    duration,
    luggageItems,
    estimatedFare,
  } = req.body;

  const luggageFile = req.file;

  if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

  // Convert numeric fields safely
  const luggageCount = toInt(luggageItems);
  const fare = toInt(estimatedFare);

  const booking = await prisma.booking.create({
    data: {
      bookingCode: `ZL-${Date.now()}`,
      pickupLocation,
      dropoffLocation,
      pickupDate: new Date(pickupDate),
      dropoffDate: new Date(dropoffDate),
      duration,
      luggageCount,
      estimatedFare: fare,
      userId: req.user.id,
      luggageItems: luggageFile
        ? { create: [{ imageUrl: `/uploads/${luggageFile.filename}` }] }
        : undefined,
    },
    include: { luggageItems: true },
  });

 res.status(201).json({ success: true, message: "Booking created successfully!", booking });

});

/**
 * GET LOGGED-IN USER BOOKINGS
 */
export const getMyBookings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

  const bookings = await prisma.booking.findMany({
    where: { userId: req.user.id },
    include: { luggageItems: true },
    orderBy: { createdAt: "desc" },
  });

  res.json({ success: true, bookings });
});

/**
 * GET SINGLE BOOKING DETAILS
 */
export const getBookingById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

  const booking = await prisma.booking.findFirst({
    where: { id: Number(id), userId: req.user.id },
    include: { luggageItems: true },
  });

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  res.json({ success: true, booking });
});

/**
 * CANCEL BOOKING
 */
export const cancelBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

  const booking = await prisma.booking.updateMany({
    where: { id: Number(id), userId: req.user.id },
    data: { status: "CANCELLED" },
  });

  if (!booking.count) return res.status(404).json({ message: "Booking not found" });

  res.json({ success: true, message: "Booking cancelled successfully" });
});