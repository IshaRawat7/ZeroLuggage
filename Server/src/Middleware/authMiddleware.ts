import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

export const auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // 1. Cookie
    token = req.cookies?.token;

    // 2. Authorization header (SAFE PARSING)
    const authHeader = req.headers.authorization || req.headers["authorization"];

    if (!token && typeof authHeader === "string") {
      const parts = authHeader.split(" ");

      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated (no token found)"
      });
    }
console.log("🔐 AUTH CHECK");
console.log("Cookies:", req.cookies);
console.log("Token:", req.cookies?.token);
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT secret missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};