import mongoose from "mongoose"

export const db = async () => {
  const db = process.env.MONGO_URL
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
