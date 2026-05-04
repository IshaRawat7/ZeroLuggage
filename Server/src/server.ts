import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import userRoutes from "./Routes/user.routes";
import luggageRoutes from "./Routes/luggage.routes";
import bookingRoutes from "./Routes/booking.routes";
import authRoutes from "./Routes/auth.routes";
import feedbackRoutes from "./Routes/feedback.routes";
import trackingRoutes from "./Routes/tracking.routes";


import { errorHandler } from "./Middleware/errorMiddleware";
import paymentRoutes from "./Routes/payment.routes";



// Load env
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);

const app = express();

/* -------------------- CORS SETUP -------------------- */

const allowedOrigins = [
  "http://localhost:3000",
  "https://zero-luggage.vercel.app/"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// Express + CORS handles OPTIONS automatically

/* -------------------- MIDDLEWARES -------------------- */

app.use(cookieParser());
app.use(express.json());

/* -------------------- STATIC FILES -------------------- */

const uploadsPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use("/uploads", express.static(uploadsPath));

/* -------------------- HEALTH CHECK -------------------- */

app.get("/", (req, res) => {
  res.send("ZeroLuggage backend running 🚀");
});

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/luggage", luggageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/payment", paymentRoutes);

/* -------------------- ERROR HANDLER -------------------- */

app.use(errorHandler);

/* -------------------- SERVER START -------------------- */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
