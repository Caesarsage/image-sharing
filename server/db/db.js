import mongoose from "mongoose"

export const db = async () => {
  const db = "mongodb+srv://img-sharing:img-sharing@cluster0.4nnlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  try {
    const connectMongoose = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (!connectMongoose) {
      console.log("Database failed to connect");
    }
    console.log("Database Connected correctly");
  } catch (err) {
    console.log(err);
  }
};
