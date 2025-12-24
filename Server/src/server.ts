import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import cookieParser from "cookie-parser";


dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
import express from "express";
import cors from "cors";


import userRoutes from "./Routes/user.routes";
import luggageRoutes from "./Routes/luggage.routes";
import bookingRoutes from "./Routes/booking.routes";

import { errorHandler } from "./Middleware/errorMiddleware";
import authRoutes from "./Routes/auth.routes";
import feedbackRoutes from "./Routes/feedback.routes";
import trackingRoutes from "./Routes/tracking.routes";



console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN
  ?.split(",")              // split by comma
  .map(origin => origin.trim()) || [];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // allow this origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies
  })
);

app.use(cookieParser());

app.use(express.json());

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));



app.get("/", (req, res) => res.send("Oluggage backend running 🚀"));




// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/luggage", luggageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tracking", trackingRoutes);



app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

