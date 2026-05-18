import multer from "multer"

/* =====================================================
   MULTER MEMORY STORAGE
   - keeps files in memory
   - enables file.buffer
===================================================== */

const storage = multer.memoryStorage()

/* =====================================================
   FILE FILTER
===================================================== */

const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed"))
  }
}

/* =====================================================
   EXPORT MULTER
===================================================== */

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },

  fileFilter,
})