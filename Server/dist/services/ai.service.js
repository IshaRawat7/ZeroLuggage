"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAIJob = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createAIJob = async ({ frontImage, sideImage, }) => {
    try {
        /* ---------------- PROJECT ---------------- */
        const project = await prismaClient_1.prisma.aIProject.create({
            data: {
                name: "Luggage Dimension Detection",
            },
        });
        /* ---------------- FRONT MEDIA ---------------- */
        const frontMedia = await prismaClient_1.prisma.mediaAsset.create({
            data: {
                url: `temp/front-${Date.now()}-${frontImage.originalname}`,
                type: "IMAGE",
                fileName: frontImage.originalname,
                size: frontImage.size,
            },
        });
        /* ---------------- SIDE MEDIA ---------------- */
        const sideMedia = await prismaClient_1.prisma.mediaAsset.create({
            data: {
                url: `temp/side-${Date.now()}-${sideImage.originalname}`,
                type: "IMAGE",
                fileName: sideImage.originalname,
                size: sideImage.size,
            },
        });
        /* ---------------- AI JOB ---------------- */
        const job = await prismaClient_1.prisma.aIJob.create({
            data: {
                projectId: project.id,
                status: "PROCESSING",
                model: "opencv-dimension-model",
                media: {
                    create: [
                        {
                            mediaId: frontMedia.id,
                            viewType: "FRONT",
                        },
                        {
                            mediaId: sideMedia.id,
                            viewType: "SIDE",
                        },
                    ],
                },
            },
            include: {
                media: {
                    include: {
                        media: true,
                    },
                },
            },
        });
        return job;
    }
    catch (error) {
        console.error("createAIJob error:", error);
        throw error;
    }
};
exports.createAIJob = createAIJob;
