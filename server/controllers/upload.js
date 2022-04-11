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

    const upload = await new Upload({
      password : hashPassword,
      image : {
        filename,
        url: path
      },
    });
    upload.id =await upload._id
    upload.protectedUrl =await `http://localhost:4000/share/${upload.id}`

    upload.save()

    const token = jwt.sign({protectedUrl: upload.protectedUrl, id: upload._id, password: hashPassword}, process.env.SECRET, {expiresIn: "30min"})
    
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

export const logUser = async(req, res, next)=>{
  const {password} = req.body
  const {id} = req.params
  try {
    const existingUser = await Upload.findById(id)

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordMatch) return res.status(400).json({message: 'Invalid credentials'})

    const token = jwt.sign({id: existingUser._id, password: existingUser.password}, process.env.SECRET, {expiresIn: "1h"})

    res.status(200).json({message: 'successful', result: existingUser, token})

  } catch (error) {
    res.status(400).json({message: 'Error occur'})
  }

}

export const getImageUrl = async (req,res,next)=>{
  const {id} = req.params
  try {
    const viewImage = await Upload.findById(id)
    if(!viewImage){
      res.status(400).json({data:null, msg:'unable to get data'})
    }
    res.status(200).json({ data: viewImage.image.url , msg: "Successful" });    

  } catch (error) {
    console.log(error);
  }
}