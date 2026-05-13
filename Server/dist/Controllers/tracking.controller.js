"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingTracking = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.getBookingTracking = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { bookingCode } = req.params;
    const booking = await prismaClient_1.prisma.booking.findUnique({
        where: { bookingCode },
        include: {
            user: true,
            luggageItems: true,
        },
    });
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    res.json({
        trackingId: booking.bookingCode,
        currentLocation: booking.status === "IN_TRANSIT"
            ? `On Route via ${booking.pickupLocation}`
            : booking.dropoffLocation,
        estimatedDelivery: booking.dropoffDate,
        status: booking.status,
        progress: getProgressFromStatus(booking.status),
        pickupLocation: {
            lat: booking.pickupLat,
            lng: booking.pickupLng,
        },
        deliveryLocation: {
            lat: booking.dropoffLat,
            lng: booking.dropoffLng,
        },
        pickupLocationName: booking.pickupLocation,
        dropoffLocationName: booking.dropoffLocation,
    });
});
// Helper
function getProgressFromStatus(status) {
    switch (status) {
        case "PENDING":
            return 0;
        case "CONFIRMED":
            return 1;
        case "IN_TRANSIT":
            return 2;
        case "DELIVERED":
            return 4;
        case "CANCELLED":
            return 0;
        default:
            return 0;
    }
}
