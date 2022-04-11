import express from "express"
import { createProtectedImg, getImageUrl, logUser } from "../controllers/upload.js"
import multer from "multer";
import { storage } from "../cloudinary/index.js";
import { authenticateUser } from "../middleware/index.js";
const upload = multer({ storage });

const router = express.Router()

router.get('/:id',authenticateUser, getImageUrl)
router.post('/',upload.single('image'), createProtectedImg)
router.post('/auth/:id', logUser )


export default router