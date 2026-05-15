"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingReminders = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createBookingReminders = async (bookingId, pickupDate, dropoffDate) => {
    try {
        const pickupReminderTime = new Date(pickupDate.getTime() + 1 * 60 * 1000);
        const dropoffReminderTime = new Date(dropoffDate.getTime() + 2 * 60 * 60 * 1000);
        await prismaClient_1.prisma.reminder.createMany({
            data: [
                {
                    bookingId,
                    type: "PICKUP",
                    remindAt: pickupReminderTime,
                },
                {
                    bookingId,
                    type: "DROPOFF",
                    remindAt: dropoffReminderTime,
                },
            ],
        });
        console.log("Reminders created");
    }
    catch (error) {
        console.log("Reminder creation error:", error);
    }
};
exports.createBookingReminders = createBookingReminders;
