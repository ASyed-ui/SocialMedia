// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postRoute from "./routes/post.route.js";
import { connectDB } from "./config/db.js";


dotenv.config();
const app = express();

// Manual CORS middleware as fallback
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// CORS configuration using cors package
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5001;
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
