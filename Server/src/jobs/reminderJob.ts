import cron from "node-cron"
import { prisma } from "../prisma/prismaClient"
import { sendEmail } from "../utils/sendEmail"

cron.schedule("*/5 * * * *", async () => {
  console.log("Checking reminders...")

  try {
    const now = new Date()

    const reminders = await prisma.reminder.findMany({
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
    })

    for (const reminder of reminders) {
      const booking = reminder.booking
      const user = booking.user

      let subject = ""
      let message = ""

      if (reminder.type === "PICKUP") {
        subject = "ZeroLuggage Pickup Reminder"

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
`
      }

      if (reminder.type === "DROPOFF") {
        subject = "ZeroLuggage Dropoff Reminder"

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
`
      }

      await sendEmail(
        user.email,
        subject,
        message
      )

      await prisma.reminder.update({
        where: {
          id: reminder.id,
        },

        data: {
          sent: true,
        },
      })

      console.log(
        `Reminder sent to ${user.email}`
      )
    }
  } catch (error) {
    console.log("Cron error:", error)
  }
})