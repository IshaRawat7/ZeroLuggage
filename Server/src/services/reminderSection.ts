import  { prisma } from "../prisma/prismaClient"

export const createBookingReminders = async (
  bookingId: number,
  pickupDate: Date,
  dropoffDate: Date
) => {
  try {
    const pickupReminderTime = new Date(
      pickupDate.getTime() - 60 * 60 * 1000
    )

    const dropoffReminderTime = new Date(
      dropoffDate.getTime() - 2 * 60 * 60 * 1000
    )

    await prisma.reminder.createMany({
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
    })

    console.log("Reminders created")
  } catch (error) {
    console.log("Reminder creation error:", error)
  }
}