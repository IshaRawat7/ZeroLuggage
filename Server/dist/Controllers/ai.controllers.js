"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIHistory = exports.getJobResult = exports.uploadLuggageImages = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const stream_1 = require("stream");
const prismaClient_1 = require("../prisma/prismaClient");
const ai_service_1 = require("../services/ai.service");
const priceCalculator_1 = require("../utils/priceCalculator");
const uploadLuggageImages = async (req, res) => {
    try {
        const files = req.files;
        const frontImage = files?.frontImage?.[0];
        const sideImage = files?.sideImage?.[0];
        if (!frontImage || !sideImage) {
            return res.status(400).json({
                success: false,
                message: "Both images are required",
            });
        }
        console.log("Front:", frontImage.originalname);
        console.log("Side:", sideImage.originalname);
        /* ---------------- CREATE JOB ---------------- */
        const job = await (0, ai_service_1.createAIJob)({
            frontImage,
            sideImage,
        });
        /* ---------------- FORM DATA ---------------- */
        const formData = new form_data_1.default();
        const frontStream = stream_1.Readable.from(frontImage.buffer);
        const sideStream = stream_1.Readable.from(sideImage.buffer);
        formData.append("frontImage", frontStream, {
            filename: frontImage.originalname,
            contentType: frontImage.mimetype,
            knownLength: frontImage.size,
        });
        formData.append("sideImage", sideStream, {
            filename: sideImage.originalname,
            contentType: sideImage.mimetype,
            knownLength: sideImage.size,
        });
        /* ---------------- SEND TO FLASK ---------------- */
        const aiResponse = await axios_1.default.post("https://abide-clunky-rubber.ngrok-free.dev/process", formData, {
            headers: {
                ...formData.getHeaders(),
            },
            maxBodyLength: Infinity,
        });
        const aiData = aiResponse.data;
        console.log("AI RESPONSE:", aiData);
        /* ---------------- SAVE DIMENSIONS ---------------- */
        if (aiData.dimensions) {
            await prismaClient_1.prisma.dimensionResult.create({
                data: {
                    width: aiData.dimensions.width,
                    height: aiData.dimensions.height,
                    depth: aiData.dimensions.depth,
                    unit: aiData.dimensions.unit || "cm",
                    jobId: job.id,
                },
            });
            /* ---------------- CALCULATE PRICING ---------------- */
            const pricing = (0, priceCalculator_1.calculatePricing)({
                width: aiData.dimensions.width,
                height: aiData.dimensions.height,
                depth: aiData.dimensions.depth,
                distance: 25,
                priority: false,
            });
            /* ---------------- SAVE PRICING ---------------- */
            await prismaClient_1.prisma.pricingResult.create({
                data: {
                    baseFare: pricing.baseFare,
                    volume: pricing.volume,
                    volumeRate: pricing.volumeRate,
                    distance: pricing.distance,
                    distanceRate: pricing.distanceRate,
                    urgencyFee: pricing.urgencyFee,
                    totalCost: pricing.totalCost,
                    category: pricing.category,
                    jobId: job.id,
                },
            });
        }
        /* ---------------- SAVE DETECTIONS ---------------- */
        if (Array.isArray(aiData.detections) &&
            aiData.detections.length > 0) {
            await prismaClient_1.prisma.detectionResult.createMany({
                data: aiData.detections.map((item) => ({
                    label: item.label,
                    confidence: item.confidence,
                    x: item.x ?? 0,
                    y: item.y ?? 0,
                    width: item.width ?? 0,
                    height: item.height ?? 0,
                    jobId: job.id,
                })),
            });
        }
        /* ---------------- SAVE VOLUME ---------------- */
        if (aiData.volume) {
            await prismaClient_1.prisma.volumeResult.create({
                data: {
                    value: aiData.volume.value,
                    unit: aiData.volume.unit || "liters",
                    jobId: job.id,
                },
            });
        }
        /* ---------------- SUCCESS ---------------- */
        return res.status(201).json({
            success: true,
            jobId: job.id,
            aiData,
        });
    }
    catch (error) {
        console.error("UPLOAD ERROR:", error?.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: error?.response?.data?.error ||
                error.message ||
                "Upload failed",
        });
    }
};
exports.uploadLuggageImages = uploadLuggageImages;
/* =====================================================
   GET SINGLE JOB
===================================================== */
const getJobResult = async (req, res) => {
    try {
        const jobId = Number(req.params.jobId);
        const result = await prismaClient_1.prisma.aIJob.findUnique({
            where: {
                id: jobId,
            },
            include: {
                media: {
                    include: {
                        media: true,
                    },
                },
                dimension: true,
                volume: true,
                pricing: true,
                results: true,
            },
        });
        return res.json({
            success: true,
            result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job",
        });
    }
};
exports.getJobResult = getJobResult;
/* =====================================================
   HISTORY
===================================================== */
const getAIHistory = async (req, res) => {
    try {
        const history = await prismaClient_1.prisma.aIJob.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                media: {
                    include: {
                        media: true,
                    },
                },
                dimension: true,
                volume: true,
                pricing: true,
                results: true,
            },
        });
        return res.json({
            success: true,
            history,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch history",
        });
    }
};
exports.getAIHistory = getAIHistory;
