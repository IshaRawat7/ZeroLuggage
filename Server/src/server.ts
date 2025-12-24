import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Import routes and middleware
import userRoutes from "./Routes/user.routes";
import luggageRoutes from "./Routes/luggage.routes";
import bookingRoutes from "./Routes/booking.routes";
import authRoutes from "./Routes/auth.routes";
import feedbackRoutes from "./Routes/feedback.routes";
import trackingRoutes from "./Routes/tracking.routes";
import { errorHandler } from "./Middleware/errorMiddleware";

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://zero-luggage.vercel.app",
  "https://zero-luggage-git-main-ishas-projects-24809793.vercel.app",
  "http://localhost:3000"
];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server requests or Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight requests safely
app.options("/*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use("/uploads", express.static(uploadsPath));

// Test root route
app.get("/", (_req, res) => res.send("Oluggage backend running 🚀"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/luggage", luggageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tracking", trackingRoutes);

// Global error handler
app.use(errorHandler);

// Catch-all route for undefined endpoints
app.all("/*", (_req, res) => res.status(404).json({ message: "Route not found" }));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
