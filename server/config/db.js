// config/db.js
import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'socialmedia' // Specify database name
    });
    console.log("✅ MongoDB connected to database: socialmedia");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
