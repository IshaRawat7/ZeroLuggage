import { Router, RequestHandler } from "express";
import { loginUser, registerUser } from "../Controllers/user.controller";

const router = Router();

// Test GET route
router.get("/", (req, res) => {
  res.json({ message: "Users route is working!" });
});

router.post("/register", registerUser as RequestHandler);
router.post("/login", loginUser as RequestHandler);

export default router;
