import express from "express"

import {
  uploadLuggageImages,
  getJobResult,
  getAIHistory,
} from "../Controllers/ai.controllers"

import { upload } from "../Middleware/upload"

const router = express.Router()

/* =====================================================
   UPLOAD LUGGAGE
===================================================== */

router.post(
  "/upload-luggage",
  upload.fields([
    {
      name: "frontImage",
      maxCount: 1,
    },
    {
      name: "sideImage",
      maxCount: 1,
    },
  ]),
  uploadLuggageImages
)

/* =====================================================
   GET SINGLE JOB
===================================================== */

router.get(
  "/job/:jobId",
  getJobResult
)

/* =====================================================
   GET HISTORY
===================================================== */

router.get(
  "/history",
  getAIHistory
)

export default router