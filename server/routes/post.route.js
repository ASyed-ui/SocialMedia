import express from "express";
import { createPost, getPost, updatePost, deletePost, likePost, dislikePost } from "../controllers/post.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/post", authenticate, createPost);
router.get("/post", getPost);
router.put("/post/:id", authenticate, updatePost);
router.delete("/post/:id", authenticate, deletePost);
router.post("/post/:id/like", authenticate, likePost);
router.post("/post/:id/dislike", authenticate, dislikePost);

export default router;
