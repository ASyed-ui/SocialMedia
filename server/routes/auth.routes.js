// routes/auth.routes.js
import express from "express";
import { register, login, logout, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// User profile
router.get("/users/:id", getProfile);
router.put("/users/:id", authenticate, updateProfile);

export default router;
