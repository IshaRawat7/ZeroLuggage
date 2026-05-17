import multer from "multer"
import path from "path"
import fs from "fs"

const createFolder = (folder: string) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
}

createFolder("uploads/front")
createFolder("uploads/side")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "frontImage") {
      cb(null, "uploads/front")
    } else {
      cb(null, "uploads/side")
    }
  },

  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname)
    cb(null, unique)
  },
})

export const upload = multer({ storage })