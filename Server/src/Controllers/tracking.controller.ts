import { prisma } from "../prisma/prismaClient";
import { asyncHandler } from "../utils/asyncHandler";

export const updateTrackingLocation = asyncHandler(async (req: { params: { deliveryId: any; }; body: { currentLocation: any; }; }, res: { json: (arg0: { id: string; deliveryId: string; currentLocation: string | null; lastUpdated: Date; }) => void; }) => {
  const { deliveryId } = req.params;
  const { currentLocation } = req.body;

  const tracking = await prisma.tracking.upsert({
    where: { deliveryId },
    update: {
      currentLocation,
      lastUpdated: new Date(),
    },
    create: {
      deliveryId,
      currentLocation,
    },
  });

  res.json(tracking);
});
