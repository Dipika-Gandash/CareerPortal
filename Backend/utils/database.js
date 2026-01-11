import mongoose from "mongoose";
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error("Database connection failed: " + error.message);
  }
};

export default connectToDatabase;