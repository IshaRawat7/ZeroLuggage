"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const createFolder = (folder) => {
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true });
    }
};
createFolder("uploads/front");
createFolder("uploads/side");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "frontImage") {
            cb(null, "uploads/front");
        }
        else {
            cb(null, "uploads/side");
        }
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + path_1.default.extname(file.originalname);
        cb(null, unique);
    },
});
exports.upload = (0, multer_1.default)({ storage });
