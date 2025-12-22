import { prisma } from "../prisma/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";
import { User } from "@prisma/client";

export const registerUser = asyncHandler(async (req: { body: { name: any; email: any; password: any; phone: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: any) => void; }) => {
  const { name, email, password, phone } = req.body;
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

if (!strongPassword.test(password)) {
  return res.status(400).json({
    message:
      "Password must be 8-16 characters long and include uppercase, lowercase, number & special character",
  });
}
  const existed = await prisma.user.findUnique({ where: { email } });
  if (existed) return res.status(400).json({ message: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hash, phone },
  });

  res.json(user);
});

export const loginUser = asyncHandler(async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; success?: boolean; token?: string; user?: { id: number; name: string; email: string; }; }): void; new(): any; }; }; }) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    token, // ✅ SEND TOKEN
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const sendOtp = asyncHandler(async (req: { body: { email: any; phone: any; name: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: { message: string; }) => void; }) => {
  const { email, phone, name, password } = req.body;

  let user = await prisma.user.findUnique({ where: { email } });

  // If user doesn't exist, create a temp user (for signup OTP)
  if (!user) {
    if (!name || !password) return res.status(400).json({ message: "Provide name & password for signup" });

    const hash = await bcrypt.hash(password, 10);

    user = await prisma.user.create({
      data: { name, email, password: hash, phone },
    });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

  await prisma.user.update({
    where: { email },
    data: { otp, otpExpiry },
  });

  await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);
  res.json({ message: "OTP sent to your email" });
});


// Verify OTP
export const verifyOtp = asyncHandler(async (req: { body: { email: any; otp: any; }; }, res: {
    status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: {
      success: boolean; token: string; // ✅ SEND TOKEN
      user: { id: number; name: string; email: string; };
    }) => void;
  }) => {
  const { email, otp } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date())
    return res.status(400).json({ message: "OTP expired or invalid" });

  if (user.otp !== otp)
    return res.status(400).json({ message: "Incorrect OTP" });

  await prisma.user.update({
    where: { email },
    data: { otp: null, otpExpiry: null },
  });

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    token, // ✅ SEND TOKEN
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
