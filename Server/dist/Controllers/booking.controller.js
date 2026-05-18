"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.getBookingById = exports.getMyBookings = exports.createBooking = void 0;
const sendEmail_1 = require("../utils/sendEmail");
const sendWhatsapp_1 = require("../utils/sendWhatsapp");
const Formatter_1 = require("../utils/Formatter");
const reminderSection_1 = require("../services/reminderSection");
const prismaClient_1 = require("../prisma/prismaClient");
const asyncHandler_1 = require("../utils/asyncHandler");
/**
 * Utility: safe number conversion
 */
const toInt = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
};
/**
 * CREATE BOOKING
 */
exports.createBooking = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { pickupLocation, pickupLat, pickupLng, dropoffLocation, dropoffLat, dropoffLng, pickupDate, dropoffDate, duration, luggageItems, estimatedFare, } = req.body;
    const luggageFiles = req.files;
    if (luggageFiles && luggageFiles.length > 5) {
        return res.status(400).json({
            message: "Maximum 5 luggage images allowed",
        });
    }
    if (!req.user?.id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const luggageCount = toInt(luggageItems);
    const fare = toInt(estimatedFare);
    // Get logged in user
    const user = await prismaClient_1.prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    // Create booking
    const booking = await prismaClient_1.prisma.booking.create({
        data: {
            bookingCode: `ZL-${Date.now()}`,
            pickupLocation,
            pickupLat: pickupLat ? Number(pickupLat) : 0,
            pickupLng: pickupLng ? Number(pickupLng) : 0,
            dropoffLocation,
            dropoffLat: dropoffLat ? Number(dropoffLat) : 0,
            dropoffLng: dropoffLng ? Number(dropoffLng) : 0,
            pickupDate: new Date(pickupDate),
            dropoffDate: new Date(dropoffDate),
            duration,
            luggageCount,
            estimatedFare: fare + luggageCount * 5 + 300, // Base fare + per luggage charge
            userId: req.user.id,
            luggageItems: luggageFiles && luggageFiles.length
                ? {
                    create: luggageFiles.map((file) => ({
                        imageUrl: `/uploads/${file.filename}`,
                    })),
                }
                : undefined,
        },
        include: {
            luggageItems: true,
        },
    });
    // CREATE REMINDERS
    await (0, reminderSection_1.createBookingReminders)(booking.id, new Date(pickupDate), new Date(dropoffDate));
    // SEND CONFIRMATION EMAIL
    await (0, sendEmail_1.sendEmail)(user.email, "Booking Confirmed - ZeroLuggage", `
Hello ${user.name},

Your booking has been confirmed successfully 🎒

Booking Code:
${booking.bookingCode}

Pickup Location:
${booking.pickupLocation}

Dropoff Location:
${booking.dropoffLocation}

Pickup Time:
${booking.pickupDate}

Dropoff Time:
${booking.dropoffDate}

Estimated Fare:
₹${booking.estimatedFare}

Thank you for choosing ZeroLuggage.
`);
    await (0, sendWhatsapp_1.sendWhatsAppMessage)({
        phone: (0, Formatter_1.formatIndianPhone)(user.phone),
        message: `Hello ${user.name},

Your booking has been confirmed 🎒

Booking Code: ${booking.bookingCode}

Pickup: ${booking.pickupLocation}

Dropoff: ${booking.dropoffLocation}

Fare: ₹${booking.estimatedFare}

Thank you for choosing ZeroLuggage.`,
    });
    res.status(201).json({
        success: true,
        message: "Booking created successfully!",
        booking,
    });
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
    // ✅ ALWAYS return array directly (important)
    res.json(bookings);
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
