"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_controllers_1 = require("../Controllers/ai.controllers");
const upload_1 = require("../Middleware/upload");
const router = express_1.default.Router();
/* =====================================================
   UPLOAD LUGGAGE
===================================================== */
router.post("/upload-luggage", upload_1.upload.fields([
    {
        name: "frontImage",
        maxCount: 1,
    },
    {
        name: "sideImage",
        maxCount: 1,
    },
]), ai_controllers_1.uploadLuggageImages);
/* =====================================================
   GET SINGLE JOB
===================================================== */
router.get("/job/:jobId", ai_controllers_1.getJobResult);
/* =====================================================
   GET HISTORY
===================================================== */
router.get("/history", ai_controllers_1.getAIHistory);
exports.default = router;
