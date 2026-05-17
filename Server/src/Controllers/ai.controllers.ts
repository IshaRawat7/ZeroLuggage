import { Request, Response } from "express"
import { prisma } from "../prisma/prismaClient"
import { createAIJob } from "../services/ai.service"



export const uploadLuggageImages = async (
  req: Request,
  res: Response
) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    const frontImage = files?.frontImage?.[0]
    const sideImage = files?.sideImage?.[0]

    if (!frontImage || !sideImage) {
      return res.status(400).json({
        success: false,
        message: "Both front and side images are required",
      })
    }

    const job = await createAIJob({
      frontImage,
      sideImage,
    })

    return res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      job,
    })
  } catch (error) {
    console.error("UPLOAD ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    })
  }
}



export const getJobResult = async (
  req: Request,
  res: Response
) => {
  try {
    const jobId = Number(req.params.jobId)

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Invalid job id",
      })
    }

    const result = await prisma.aIJob.findUnique({
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
    })

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      })
    }

    return res.status(200).json({
      success: true,
      result,
    })
  } catch (error) {
    console.error("FETCH RESULT ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to fetch result",
    })
  }
}

/* =====================================================
   GET ALL HISTORY
===================================================== */

export const getAIHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const history = await prisma.aIJob.findMany({
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
    })

    return res.status(200).json({
      success: true,
      history,
    })
  } catch (error) {
    console.error("HISTORY ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    })
  }
}