"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
/* =====================================================
   MULTER MEMORY STORAGE
   - keeps files in memory
   - enables file.buffer
===================================================== */
const storage = multer_1.default.memoryStorage();
/* =====================================================
   FILE FILTER
===================================================== */
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed"));
    }
};
/* =====================================================
   EXPORT MULTER
===================================================== */
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter,
});
