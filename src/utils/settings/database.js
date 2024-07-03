import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected", connection.connection.host);
  } catch (error) {
    console.log("Database connnection failed", error);
  }
};

export default connectDB;
