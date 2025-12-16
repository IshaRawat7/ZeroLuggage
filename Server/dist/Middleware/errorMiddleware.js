"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
