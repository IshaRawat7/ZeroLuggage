import { Router } from "express";
import { updateDeliveryStatus } from "../Controllers/delivery.controller";

const router = Router();

router.put("/status/:id", updateDeliveryStatus);

export default router;
