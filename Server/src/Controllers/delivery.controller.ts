import { prisma } from "../prisma/prismaClient";
import { asyncHandler } from "../utils/asyncHandler";

export const updateDeliveryStatus = asyncHandler(async (req: { params: { id: any; }; body: { status: any; }; }, res: { json: (arg0: any) => void; }) => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await prisma.delivery.update({
    where: { id },
    data: { status },
  });

  res.json(updated);
});
