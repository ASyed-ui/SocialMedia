// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postRoute from "./routes/post.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://comp229_useradmin:7qPyLAPFtLEQBoy2@connectsphere.tqqdn3s.mongodb.net/?appName=ConnectSphere";

// Connect DB
connectDB(MONGO_URI);

// Routes
app.use("/api", authRoutes);
app.use("/api", postRoute);

// Basic health route
app.get("/", (req, res) => res.send("Socialmedia API running"));

// Error handler fallback
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error." });
});

app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
