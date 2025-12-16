"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../Controllers/user.controller");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
exports.default = router;
