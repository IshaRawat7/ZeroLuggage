import { prisma } from "../prisma/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";

// ================= REGISTER =================
export const registerUser = asyncHandler(async (req: any, res: any) => {
  const { name, email, password, phone } = req.body;

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

  if (!strongPassword.test(password)) {
    return res.status(400).json({
      message:
        "Password must be 8-16 characters long and include uppercase, lowercase, number & special character",
    });
  }

  const existed = await prisma.user.findUnique({ where: { email } });

  if (existed) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      phone,
    },
  });

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

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
export const loginUser = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});


// ================= SEND OTP =================
export const sendOtp = asyncHandler(async (req: any, res: any) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // 🚫 Prevent OTP spam
  if (user?.otpExpiry && user.otpExpiry > new Date()) {
    return res.status(400).json({
      message: "OTP already sent. Please wait before requesting again.",
    });
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  if (user) {
    // existing user
    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry,
      },
    });
  } else {
    // new signup user
    await prisma.user.create({
      data: {
        email,
        otp,
        otpExpiry,
        name: "Temp",
        password: "temp",
        phone: "",
      },
    });
  }

  await sendEmail(
    email,
    "OTP Verification",
    `<h2>Your OTP is: ${otp}</h2><p>This OTP is valid for 5 minutes.</p>`
  );

  console.log("OTP:", otp);

  res.json({
    success: true,
    message: "OTP sent to your email",
  });
});


// ================= VERIFY OTP =================
export const verifyOtp = asyncHandler(async (req: any, res: any) => {
  const { email, otp, name, password, phone } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Incorrect OTP" });
  }

  let updatedUser = user;

  // 🔐 Complete signup if temp user
  if (user.password === "temp") {
    if (!name || !password) {
      return res.status(400).json({
        message: "Provide name & password to complete signup",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        password: hash,
        phone,
        otp: null,
        otpExpiry: null,
      },
    });
  } else {
    // normal login OTP
    updatedUser = await prisma.user.update({
      where: { email },
      data: {
        otp: null,
        otpExpiry: null,
      },
    });
  }

  const token = jwt.sign(
    { id: updatedUser.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

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