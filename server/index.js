import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"

import { db } from "./db/db.js";
import router from './routes/image-upload.js';

const app = express();

// connect to database
db();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', router)

app.all("*", (req, res, next) => {
  next("Page not found", 404);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening at PORT ${PORT}`));