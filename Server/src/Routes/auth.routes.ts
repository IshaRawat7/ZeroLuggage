import express from "express";
import { registerUser, loginUser } from "../Controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// JWT logout is client-side, but route is optional
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
