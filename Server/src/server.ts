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

const allowedOrigins = [
  "https://zero-luggage.vercel.app",
  "https://zero-luggage-git-main-ishas-projects-24809793.vercel.app",
  "http://localhost:3000"
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// IMPORTANT
app.options("*", cors())



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

