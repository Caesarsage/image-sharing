import mongoose from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function(){
  return this.url.replace('/upload', '/upload/w_300')
})


const uploadSchema = new Schema({
  id: String,
  image: ImageSchema ,
  protectedUrl:{
    type: String
  },
  password:{
    type: String,
    required : true
  }
}, { timestamps: true })


export const Upload = mongoose.model('Upload', uploadSchema);