"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../utils/asyncHandler");
exports.registerUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, password, phone } = req.body;
    const existed = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    if (existed)
        return res.status(400).json({ message: "Email already exists" });
    const hash = await bcryptjs_1.default.hash(password, 10);
    const user = await prismaClient_1.prisma.user.create({
        data: { name, email, password: hash, phone },
    });
    res.json(user);
});
exports.loginUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const user = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ message: "Incorrect password" });
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.json({ token, user });
});
