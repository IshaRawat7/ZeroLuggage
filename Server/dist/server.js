"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./Routes/user.routes"));
const luggage_routes_1 = __importDefault(require("./Routes/luggage.routes"));
const booking_routes_1 = __importDefault(require("./Routes/booking.routes"));
const errorMiddleware_1 = require("./Middleware/errorMiddleware");
const auth_routes_1 = __importDefault(require("./Routes/auth.routes"));
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ensure uploads folder exists
const uploadsPath = path_1.default.join(__dirname, "../uploads");
if (!fs_1.default.existsSync(uploadsPath))
    fs_1.default.mkdirSync(uploadsPath, { recursive: true });
app.get("/", (req, res) => res.send("Oluggage backend running 🚀"));
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/luggage", luggage_routes_1.default);
app.use("/api/bookings", booking_routes_1.default);
// ❗ MUST BE LAST
app.use(errorMiddleware_1.errorHandler);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
