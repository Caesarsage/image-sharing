import { Upload } from "../model/image-upload-model.js";
import bcrypt from "bcrypt"
import { cloudinarySet } from "../cloudinary/index.js";
import jwt from "jsonwebtoken"

export const createProtectedImg = async (req, res, next) => {
  const { password } = req.body;
  const { filename, path} = req.file;
  try {

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const upload = await Upload.create({
      password : hashPassword,
      image : {
        filename,
        url: path
      },
    });
    upload.id = upload._id
    protectedUrl = `http://localhost:4000/share/${upload.id}`

    const token = jwt.sign({protectedUrl: upload.protectedUrl, id: upload._id}, 'someSecretToChangeLater', {expiresIn: "1h"})
    
    if(!upload){
      await cloudinarySet.uploader.destroy(upload.image.filename);
      return next('error occur');
    }
    res.status(200).json({ data: upload , msg: "Successfully made an upload", token });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

export const getImageUrl = async (req,res,next)=>{

}