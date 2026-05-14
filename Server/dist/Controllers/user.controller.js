"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = exports.loginUser = exports.registerUser = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../utils/asyncHandler");
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = require("../utils/sendEmail");
// ================= REGISTER =================
exports.registerUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, password, phone } = req.body;
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
    if (!strongPassword.test(password)) {
        return res.status(400).json({
            message: "Password must be 8-16 characters long and include uppercase, lowercase, number & special character",
        });
    }
    const existed = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    if (existed)
        return res.status(400).json({ message: "Email already exists" });
    const hash = await bcryptjs_1.default.hash(password, 10);
    const user = await prismaClient_1.prisma.user.create({
        data: { name, email, password: hash, phone },
    });
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({
        success: true,
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});
// ================= LOGIN =================
exports.loginUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const user = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ message: "Incorrect password" });
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});
// ================= SEND OTP =================
exports.sendOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const user = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    // 🚫 Prevent OTP spam (if already sent and not expired)
    if (user?.otpExpiry && user.otpExpiry > new Date()) {
        return res.status(400).json({
            message: "OTP already sent. Please wait before requesting again.",
        });
    }
    const otp = crypto_1.default.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    if (user) {
        // existing user → update OTP
        await prismaClient_1.prisma.user.update({
            where: { email },
            data: { otp, otpExpiry },
        });
    }
    else {
        // new user → create minimal record
        await prismaClient_1.prisma.user.create({
            data: {
                email,
                otp,
                otpExpiry,
                name: "Temp",
                password: "temp", // will update later
                phone: "", // will update later
            },
        });
    }
    // 📩 Send email via Resend
    await (0, sendEmail_1.sendEmail)(email, "OTP Verification", `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`);
    console.log("OTP:", otp); // fallback
    res.json({ message: "OTP sent to your email" });
});
// ================= VERIFY OTP =================
exports.verifyOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, otp, name, password, phone } = req.body;
    const user = await prismaClient_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
        return res.status(400).json({ message: "OTP expired or invalid" });
    }
    if (user.otp !== otp) {
        return res.status(400).json({ message: "Incorrect OTP" });
    }
    // 🔐 If it's a new user → complete registration
    let updatedUser = user;
    if (user.password === "temp") {
        if (!name || !password) {
            return res.status(400).json({
                message: "Provide name & password to complete signup",
            });
        }
        const hash = await bcryptjs_1.default.hash(password, 10);
        updatedUser = await prismaClient_1.prisma.user.update({
            where: { email },
            data: {
                name,
                password: hash,
                phone,
            },
        });
    }
    // clear OTP
    await prismaClient_1.prisma.user.update({
        where: { email },
        data: { otp: null, otpExpiry: null },
    });
    const token = jsonwebtoken_1.default.sign({ id: updatedUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
        success: true,
        token,
        user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        },
    });
});
