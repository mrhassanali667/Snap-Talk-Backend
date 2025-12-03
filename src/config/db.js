import mongoose from "mongoose";
import dotenv from "dotenv/config";


const dbURI = process.env.MONGODB_URI || "mongodb://";

mongoose.connect(dbURI)