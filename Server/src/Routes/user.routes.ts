import { Router } from "express";
import type { Request, Response } from "express";
import { loginUser, registerUser } from "../Controllers/user.controller";

const router = Router();

// Test route
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Users route is working!" });
});

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;