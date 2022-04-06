import express from "express"
import { createProtectedImg } from "../controllers/upload.js"
import multer from "multer";
import { cloudinarySet, storage } from "../cloudinary/index.js";
const upload = multer({ storage });

const router = express.Router()

router.post('/',upload.single('image'), createProtectedImg)
router.get('/:id')

export default router