import { Request, Response } from "express"
import axios from "axios"
import FormData from "form-data"
import { Readable } from "stream"

import { prisma } from "../prisma/prismaClient"
import { createAIJob } from "../services/ai.service"
import { calculatePricing } from "../utils/priceCalculator"

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
        message: "Both images are required",
      })
    }

    console.log("Front:", frontImage.originalname)
    console.log("Side:", sideImage.originalname)

    /* ---------------- CREATE JOB ---------------- */

    const job = await createAIJob({
      frontImage,
      sideImage,
    })

    /* ---------------- FORM DATA ---------------- */

    const formData = new FormData()

    const frontStream = Readable.from(frontImage.buffer)
    const sideStream = Readable.from(sideImage.buffer)

    formData.append("frontImage", frontStream, {
      filename: frontImage.originalname,
      contentType: frontImage.mimetype,
      knownLength: frontImage.size,
    })

    formData.append("sideImage", sideStream, {
      filename: sideImage.originalname,
      contentType: sideImage.mimetype,
      knownLength: sideImage.size,
    })

    /* ---------------- SEND TO FLASK ---------------- */

    const aiResponse = await axios.post(
      "https://abide-clunky-rubber.ngrok-free.dev/process",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxBodyLength: Infinity,
      }
    )

    const aiData = aiResponse.data

    console.log("AI RESPONSE:", aiData)

    /* ---------------- SAVE DIMENSIONS ---------------- */

    if (aiData.dimensions) {
      await prisma.dimensionResult.create({
        data: {
          width: aiData.dimensions.width,
          height: aiData.dimensions.height,
          depth: aiData.dimensions.depth,
          unit: aiData.dimensions.unit || "cm",
          jobId: job.id,
        },
      })

      /* ---------------- CALCULATE PRICING ---------------- */

      const pricing = calculatePricing({
        width: aiData.dimensions.width,
        height: aiData.dimensions.height,
        depth: aiData.dimensions.depth,

        distance: 25,
        priority: false,
      })

      /* ---------------- SAVE PRICING ---------------- */

      await prisma.pricingResult.create({
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
      })
    }

    /* ---------------- SAVE DETECTIONS ---------------- */

    if (
      Array.isArray(aiData.detections) &&
      aiData.detections.length > 0
    ) {
      await prisma.detectionResult.createMany({
        data: aiData.detections.map((item: any) => ({
          label: item.label,
          confidence: item.confidence,

          x: item.x ?? 0,
          y: item.y ?? 0,
          width: item.width ?? 0,
          height: item.height ?? 0,

          jobId: job.id,
        })),
      })
    }

    /* ---------------- SAVE VOLUME ---------------- */

    if (aiData.volume) {
      await prisma.volumeResult.create({
        data: {
          value: aiData.volume.value,
          unit: aiData.volume.unit || "liters",
          jobId: job.id,
        },
      })
    }

    /* ---------------- SUCCESS ---------------- */

    return res.status(201).json({
      success: true,
      jobId: job.id,
      aiData,
    })
  } catch (error: any) {
    console.error(
      "UPLOAD ERROR:",
      error?.response?.data || error.message
    )

    return res.status(500).json({
      success: false,
      message:
        error?.response?.data?.error ||
        error.message ||
        "Upload failed",
    })
  }
}

/* =====================================================
   GET SINGLE JOB
===================================================== */

export const getJobResult = async (
  req: Request,
  res: Response
) => {
  try {
    const jobId = Number(req.params.jobId)

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
        volume: true,
        pricing: true,

        results: true,
      },
    })

    return res.json({
      success: true,
      result,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job",
    })
  }
}

/* =====================================================
   HISTORY
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
        volume: true,
        pricing: true,

        results: true,
      },
    })

    return res.json({
      success: true,
      history,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    })
  }
}