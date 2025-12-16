import path from "path";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
import express from "express";
import cors from "cors";


import userRoutes from "./Routes/user.routes";
import luggageRoutes from "./Routes/luggage.routes";
import bookingRoutes from "./Routes/booking.routes";
import deliveryRoutes from "./Routes/delivery.routes";
import trackingRoutes from "./Routes/tracking.routes";
import  paymentRoutes  from "./Routes/payment.routes";
import { errorHandler } from "./Middleware/errorMiddleware";
import authRoutes from "./Routes/auth.routes";



console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });


app.get("/", (req, res) => res.send("Oluggage backend running 🚀"));

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/luggage", luggageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/payment", paymentRoutes);

// ❗ MUST BE LAST
app.use(errorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
