import { prisma } from "../prisma/prismaClient"

export const createAIJob = async ({
  frontImage,
  sideImage,
}: {
  frontImage: Express.Multer.File
  sideImage: Express.Multer.File
}) => {

  /* ---------------- CREATE PROJECT ---------------- */

  const project = await prisma.aIProject.create({
    data: {
      name: "Luggage Dimension Detection",
    },
  })

  /* ---------------- FRONT IMAGE ---------------- */

  const frontMedia = await prisma.mediaAsset.create({
    data: {
      url: `/uploads/front/${frontImage.filename}`,
      type: "IMAGE",
      fileName: frontImage.originalname,
      size: frontImage.size,
    },
  })

  /* ---------------- SIDE IMAGE ---------------- */

  const sideMedia = await prisma.mediaAsset.create({
    data: {
      url: `/uploads/side/${sideImage.filename}`,
      type: "IMAGE",
      fileName: sideImage.originalname,
      size: sideImage.size,
    },
  })

  /* ---------------- CREATE AI JOB ---------------- */

  const job = await prisma.aIJob.create({
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
  })

  return job
}