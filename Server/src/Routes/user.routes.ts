import { Router, RequestHandler } from "express";
import { loginUser, registerUser } from "../Controllers/user.controller";


const router = Router();

router.post("/register", registerUser as RequestHandler);
router.post("/login", loginUser as RequestHandler);

export default router;
