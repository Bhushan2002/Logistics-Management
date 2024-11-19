import mongoose from "mongoose";
import { config } from "dotenv";
config();

export async function connectDatabase() {
  try {
    const uri = process.env.MONGOURL!;
    await mongoose.connect(uri);
    console.log("Database is connected 🚀");
  } catch (error) {
    console.error(error);
  }
}

export async function disconnectDatabase() {
  try {
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
      console.log("Database is disconnected ❌");
    }
  } catch (error) {
    console.error(error);
  }
}
