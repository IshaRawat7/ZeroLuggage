"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIHistory = exports.getJobResult = exports.uploadLuggageImages = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const ai_service_1 = require("../services/ai.service");
/* =====================================================
   UPLOAD LUGGAGE IMAGES
===================================================== */
const uploadLuggageImages = async (req, res) => {
    try {
        const files = req.files;
        const frontImage = files?.frontImage?.[0];
        const sideImage = files?.sideImage?.[0];
        if (!frontImage || !sideImage) {
            return res.status(400).json({
                success: false,
                message: "Both front and side images are required",
            });
        }
        const job = await (0, ai_service_1.createAIJob)({
            frontImage,
            sideImage,
        });
        return res.status(201).json({
            success: true,
            message: "Images uploaded successfully",
            job,
        });
    }
    catch (error) {
        console.error("UPLOAD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Upload failed",
        });
    }
};
exports.uploadLuggageImages = uploadLuggageImages;
/* =====================================================
   GET SINGLE JOB RESULT
===================================================== */
const getJobResult = async (req, res) => {
    try {
        const jobId = Number(req.params.jobId);
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Invalid job id",
            });
        }
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
                results: true,
            },
        });
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }
        return res.status(200).json({
            success: true,
            result,
        });
    }
    catch (error) {
        console.error("FETCH RESULT ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch result",
        });
    }
};
exports.getJobResult = getJobResult;
/* =====================================================
   GET ALL HISTORY
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
                results: true,
            },
        });
        return res.status(200).json({
            success: true,
            history,
        });
    }
    catch (error) {
        console.error("HISTORY ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch history",
        });
    }
};
exports.getAIHistory = getAIHistory;
