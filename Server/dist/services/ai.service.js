"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAIJob = void 0;
const prismaClient_1 = require("../prisma/prismaClient");
const createAIJob = async ({ frontImage, sideImage, }) => {
    /* ---------------- CREATE PROJECT ---------------- */
    const project = await prismaClient_1.prisma.aIProject.create({
        data: {
            name: "Luggage Dimension Detection",
        },
    });
    /* ---------------- FRONT IMAGE ---------------- */
    const frontMedia = await prismaClient_1.prisma.mediaAsset.create({
        data: {
            url: `/uploads/front/${frontImage.filename}`,
            type: "IMAGE",
            fileName: frontImage.originalname,
            size: frontImage.size,
        },
    });
    /* ---------------- SIDE IMAGE ---------------- */
    const sideMedia = await prismaClient_1.prisma.mediaAsset.create({
        data: {
            url: `/uploads/side/${sideImage.filename}`,
            type: "IMAGE",
            fileName: sideImage.originalname,
            size: sideImage.size,
        },
    });
    /* ---------------- CREATE AI JOB ---------------- */
    const job = await prismaClient_1.prisma.aIJob.create({
        data: {
            projectId: project.id,
            status: "PENDING",
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
};
exports.createAIJob = createAIJob;
