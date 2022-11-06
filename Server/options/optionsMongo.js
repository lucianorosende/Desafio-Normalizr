import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const url = process.env.MONGO_URL;
export const connect = mongoose.connect(url);
