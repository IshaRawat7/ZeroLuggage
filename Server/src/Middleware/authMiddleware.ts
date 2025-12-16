import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request type to include `user`
export interface AuthenticatedRequest extends Request {
  user?: { id: number; [key: string]: any } | JwtPayload;
}

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT secret not set");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded as { id: number }; // attach decoded token payload
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
