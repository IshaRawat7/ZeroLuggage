import { prisma } from "../prisma/prismaClient"

export const createAIJob = async ({
  frontImage,
  sideImage,
}: {
  frontImage: Express.Multer.File
  sideImage: Express.Multer.File
}) => {
  try {
    /* ---------------- PROJECT ---------------- */

    const project = await prisma.aIProject.create({
      data: {
        name: "Luggage Dimension Detection",
      },
    })

    /* ---------------- FRONT MEDIA ---------------- */

    const frontMedia = await prisma.mediaAsset.create({
      data: {
        url: `temp/front-${Date.now()}-${frontImage.originalname}`,
        type: "IMAGE",
        fileName: frontImage.originalname,
        size: frontImage.size,
      },
    })

    /* ---------------- SIDE MEDIA ---------------- */

    const sideMedia = await prisma.mediaAsset.create({
      data: {
        url: `temp/side-${Date.now()}-${sideImage.originalname}`,
        type: "IMAGE",
        fileName: sideImage.originalname,
        size: sideImage.size,
      },
    })

    /* ---------------- AI JOB ---------------- */

    const job = await prisma.aIJob.create({
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
    })

    return job
  } catch (error) {
    console.error("createAIJob error:", error)
    throw error
  }
}