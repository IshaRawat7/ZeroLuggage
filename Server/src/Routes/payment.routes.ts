import { Router } from "express";
import { createPayment } from "../Controllers/payment.controller";

const router = Router();

router.post("/", createPayment);

export default router;
