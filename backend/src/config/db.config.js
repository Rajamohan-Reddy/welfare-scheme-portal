import mongoose from "mongoose";
import { env } from "./env.config.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);

    process.exit(1);
  }
};
