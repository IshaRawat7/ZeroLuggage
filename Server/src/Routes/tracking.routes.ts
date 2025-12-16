import { Router } from "express";
import { updateTrackingLocation } from "../Controllers/tracking.controller";

const router = Router();

router.put("/:deliveryId", updateTrackingLocation);

export default router;
