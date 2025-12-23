import { BookingStatus } from "@prisma/client";
import { prisma } from "../prisma/prismaClient";
import { asyncHandler } from "../utils/asyncHandler";

// Get booking details by tracking code
export const getBookingTracking = asyncHandler(async (req: { params: { trackingCode: any; }; }, res: {
    status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: {
      trackingId: string; currentLocation: string; estimatedDelivery: Date; status: BookingStatus; progress: number;
      // ✅ Use actual lat/lng fields from DB
      pickupLocation: { lat: number; lng: number; }; deliveryLocation: { lat: number; lng: number; };
      // ✅ Also return names for UI
      pickupLocationName: string; dropoffLocationName: string;
    }) => void;
  }) => {
  const { trackingCode } = req.params;

  const booking = await prisma.booking.findUnique({
    where: { bookingCode: trackingCode },
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
    currentLocation:
      booking.status === "IN_TRANSIT"
        ? `On Route via ${booking.pickupLocation}`
        : booking.dropoffLocation,
    estimatedDelivery: booking.dropoffDate,
    status: booking.status,
    progress: getProgressFromStatus(booking.status),

    // ✅ Use actual lat/lng fields from DB
    pickupLocation: {
      lat: booking.pickupLat,
      lng: booking.pickupLng,
    },
    deliveryLocation: {
      lat: booking.dropoffLat,
      lng: booking.dropoffLng,
    },

    // ✅ Also return names for UI
    pickupLocationName: booking.pickupLocation,
    dropoffLocationName: booking.dropoffLocation,
  });
});

// Helper function to convert status to step progress
function getProgressFromStatus(status: BookingStatus) {
  switch (status) {
    case "PENDING": return 0;
    case "CONFIRMED": return 1;
    case "IN_TRANSIT": return 2;
    case "DELIVERED": return 4;
    case "CANCELLED": return 0;
    default: return 0;
  }
}
