"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        let token;
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
exports.auth = auth;
