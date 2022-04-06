import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";

export const cloudinarySet = cloudinary.v2;

import cloudinaryStore from "multer-storage-cloudinary";
const { CloudinaryStorage } = cloudinaryStore;

cloudinarySet.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinarySet,
  params: {
    folder: "imageUpload",
    allowedFormats: ["jpeg", "png", "jpg", "svg"],
  },
});