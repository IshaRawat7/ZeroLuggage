import express from "express";
import { auth } from "../Middleware/authMiddleware";
import {
  addLuggage,
  getMyLuggage
} from "../Controllers/luggage.controller";

const router = express.Router();



router.post("/", auth as unknown as express.RequestHandler, addLuggage);
router.get("/", auth as unknown as express.RequestHandler, getMyLuggage);

export default router;
