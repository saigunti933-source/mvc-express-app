
import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
};

export default connectDB;
