// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postRoute from "./routes/post.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  "https://social-media-qrhn-git-main-aadil-syeds-projects.vercel.app", // Vercel frontend
  "https://social-media-qrhn.vercel.app"
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true
}));

// Handle preflight requests manually (optional)
// app.options("*", cors());

// Body parser
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://comp229_useradmin:7qPyLAPFtLEQBoy2@connectsphere.tqqdn3s.mongodb.net/?appName=ConnectSphere";

// Connect to MongoDB
connectDB(MONGO_URI);

// Routes
app.use("/api", authRoutes);
app.use("/api", postRoute);

// Health check
app.get("/", (req, res) => res.send("Socialmedia API running"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server error." });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
