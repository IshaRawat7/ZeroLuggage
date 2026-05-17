"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./services/reminderSection");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./Routes/user.routes"));
const luggage_routes_1 = __importDefault(require("./Routes/luggage.routes"));
const booking_routes_1 = __importDefault(require("./Routes/booking.routes"));
const auth_routes_1 = __importDefault(require("./Routes/auth.routes"));
const feedback_routes_1 = __importDefault(require("./Routes/feedback.routes"));
const tracking_routes_1 = __importDefault(require("./Routes/tracking.routes"));
const errorMiddleware_1 = require("./Middleware/errorMiddleware");
const payment_routes_1 = __importDefault(require("./Routes/payment.routes"));
const ai_routes_1 = __importDefault(require("./Routes/ai.routes"));
// Load env
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log("\n==============================");
    console.log("🔥 REQUEST:", req.method, req.url);
    console.log("Origin:", req.headers.origin);
    console.log("Cookie header:", req.headers.cookie);
    console.log("==============================\n");
    next();
});
/* -------------------- CORS SETUP -------------------- */
const allowedOrigins = [
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Express + CORS handles OPTIONS automatically
/* -------------------- MIDDLEWARES -------------------- */
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    console.log("🍪 Parsed cookies:", req.cookies);
    next();
});
app.use(express_1.default.json());
/* -------------------- STATIC FILES -------------------- */
const uploadsPath = path_1.default.join(__dirname, "../uploads");
if (!fs_1.default.existsSync(uploadsPath)) {
    fs_1.default.mkdirSync(uploadsPath, { recursive: true });
}
app.use("/uploads", express_1.default.static(uploadsPath));
/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
    res.send("ZeroLuggage backend running 🚀");
});
/* -------------------- ROUTES -------------------- */
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/feedback", feedback_routes_1.default);
app.use("/api/luggage", luggage_routes_1.default);
app.use("/api/bookings", booking_routes_1.default);
app.use("/api/tracking", tracking_routes_1.default);
app.use("/api/payment", payment_routes_1.default);
app.use("/api/ai", ai_routes_1.default);
/* -------------------- ERROR HANDLER -------------------- */
app.use(errorMiddleware_1.errorHandler);
/* -------------------- SERVER START -------------------- */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
