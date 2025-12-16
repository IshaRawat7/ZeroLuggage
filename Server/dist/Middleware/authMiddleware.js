"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded; // attach decoded token payload
        next();
    }
    catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.auth = auth;
