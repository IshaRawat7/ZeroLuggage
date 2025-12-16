"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../Middleware/authMiddleware");
const luggage_controller_1 = require("../Controllers/luggage.controller");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.auth, luggage_controller_1.addLuggage);
router.get("/", authMiddleware_1.auth, luggage_controller_1.getMyLuggage);
exports.default = router;
