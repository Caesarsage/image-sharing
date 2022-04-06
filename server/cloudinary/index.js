import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";

export const cloudinarySet = cloudinary.v2;

import cloudinaryStore from "multer-storage-cloudinary";
const { CloudinaryStorage } = cloudinaryStore;

cloudinarySet.config({
  cloud_name: "dwfxe7enj",
  api_key: "657776267443449",
  api_secret: "lR5WXR6pbtYtklPKxP58nz5pj64",
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinarySet,
  params: {
    folder: "imageUpload",
    allowedFormats: ["jpeg", "png", "jpg", "svg"],
  },
});