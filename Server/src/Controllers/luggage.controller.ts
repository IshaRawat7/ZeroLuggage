import { Request, Response } from "express"
import { prisma } from "../prisma/prismaClient"
import { asyncHandler } from "../utils/asyncHandler"

/**
 * ADD LUGGAGE TO BOOKING
 */
export const addLuggage = asyncHandler(async (req: Request, res: Response) => {
  const { bookingId, imageUrl } = req.body

  // Check booking ownership
  const booking = await prisma.booking.findFirst({
    where: {
      id: Number(bookingId),
      userId: (req.user as any).id,
    },
  })

  if (!booking) {
    return res.status(403).json({ message: "Invalid booking access" })
  }

  const luggage = await prisma.luggage.create({
    data: {
      bookingId: booking.id,
      imageUrl,
    },
  })

  res.status(201).json({
    success: true,
    luggage,
  })
})

/**
 * GET ALL LUGGAGE FOR USER
 */
export const getMyLuggage = asyncHandler(async (req: Request, res: Response) => {
  const luggage = await prisma.luggage.findMany({
    where: {
      booking: {
        userId: (req.user as any).id,
      },
    },
    include: {
      booking: true,
    },
  })

  res.json({
    success: true,
    luggage,
  })
})
