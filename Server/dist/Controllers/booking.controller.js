"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.getBookingById = exports.getMyBookings = exports.createBooking = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const asyncHandler_1 = require("../utils/asyncHandler");
/**
 * CREATE BOOKING
 *
 */
const toInt = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
};
exports.createBooking = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { pickupLocation, dropoffLocation, pickupDate, dropoffDate, duration, luggageItems, estimatedFare, } = req.body;
    const luggageFile = req.file;
    if (!req.user?.id)
        return res.status(401).json({ message: "Unauthorized" });
    // Convert numeric fields safely
    const luggageCount = toInt(luggageItems);
    const fare = toInt(estimatedFare);
    const booking = await prismaClient_1.prisma.booking.create({
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
exports.getMyBookings = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user?.id)
        return res.status(401).json({ message: "Unauthorized" });
    const bookings = await prismaClient_1.prisma.booking.findMany({
        where: { userId: req.user.id },
        include: { luggageItems: true },
        orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, bookings });
});
/**
 * GET SINGLE BOOKING DETAILS
 */
exports.getBookingById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!req.user?.id)
        return res.status(401).json({ message: "Unauthorized" });
    const booking = await prismaClient_1.prisma.booking.findFirst({
        where: { id: Number(id), userId: req.user.id },
        include: { luggageItems: true },
    });
    if (!booking)
        return res.status(404).json({ message: "Booking not found" });
    res.json({ success: true, booking });
});
/**
 * CANCEL BOOKING
 */
exports.cancelBooking = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!req.user?.id)
        return res.status(401).json({ message: "Unauthorized" });
    const booking = await prismaClient_1.prisma.booking.updateMany({
        where: { id: Number(id), userId: req.user.id },
        data: { status: "CANCELLED" },
    });
    if (!booking.count)
        return res.status(404).json({ message: "Booking not found" });
    res.json({ success: true, message: "Booking cancelled successfully" });
});
