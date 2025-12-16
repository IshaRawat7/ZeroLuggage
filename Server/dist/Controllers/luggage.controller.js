"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyLuggage = exports.addLuggage = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const asyncHandler_1 = require("../utils/asyncHandler");
/**
 * ADD LUGGAGE TO BOOKING
 */
exports.addLuggage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { bookingId, imageUrl } = req.body;
    // Check booking ownership
    const booking = await prismaClient_1.prisma.booking.findFirst({
        where: {
            id: Number(bookingId),
            userId: req.user.id,
        },
    });
    if (!booking) {
        return res.status(403).json({ message: "Invalid booking access" });
    }
    const luggage = await prismaClient_1.prisma.luggage.create({
        data: {
            bookingId: booking.id,
            imageUrl,
        },
    });
    res.status(201).json({
        success: true,
        luggage,
    });
});
/**
 * GET ALL LUGGAGE FOR USER
 */
exports.getMyLuggage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const luggage = await prismaClient_1.prisma.luggage.findMany({
        where: {
            booking: {
                userId: req.user.id,
            },
        },
        include: {
            booking: true,
        },
    });
    res.json({
        success: true,
        luggage,
    });
});
