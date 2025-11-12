import express from "express";
import { createPost, getPost, updatePost, deletePost } from "../controllers/post.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/post", authenticate, createPost);
router.get("/post", getPost);
router.put("/post/:id", authenticate, updatePost);
router.delete("/post/:id", authenticate, deletePost);

export default router;
