"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const prismaClient_1 = require("../prisma/prismaClient");
const sendEmail_1 = require("../utils/sendEmail");
node_cron_1.default.schedule("* * * * *", async () => {
    console.log("Checking reminders...");
    try {
        const now = new Date();
        const reminders = await prismaClient_1.prisma.reminder.findMany({
            where: {
                sent: false,
                remindAt: {
                    lte: now,
                },
                booking: {
                    status: {
                        not: "CANCELLED",
                    },
                },
            },
            include: {
                booking: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        for (const reminder of reminders) {
            const booking = reminder.booking;
            const user = booking.user;
            let subject = "";
            let message = "";
            if (reminder.type === "PICKUP") {
                subject = "ZeroLuggage Pickup Reminder";
                message = `
Hello ${user.name},

Your luggage pickup is scheduled soon.

Pickup Location:
${booking.pickupLocation}

Pickup Time:
${booking.pickupDate}

Booking Code:
${booking.bookingCode}

Thanks,
ZeroLuggage Team
`;
            }
            if (reminder.type === "DROPOFF") {
                subject = "ZeroLuggage Dropoff Reminder";
                message = `
Hello ${user.name},

Your luggage dropoff is scheduled soon.

Dropoff Location:
${booking.dropoffLocation}

Dropoff Time:
${booking.dropoffDate}

Booking Code:
${booking.bookingCode}

Thanks,
ZeroLuggage Team
`;
            }
            await (0, sendEmail_1.sendEmail)(user.email, subject, message);
            await prismaClient_1.prisma.reminder.update({
                where: {
                    id: reminder.id,
                },
                data: {
                    sent: true,
                },
            });
            console.log(`Reminder sent to ${user.email}`);
        }
    }
    catch (error) {
        console.log("Cron error:", error);
    }
});
