// routes/search.route.js
import express from "express";
import { searchUsers, searchPosts, searchAll } from "../controllers/search.controller.js";

const router = express.Router();

// Search routes
router.get("/search/users", searchUsers);
router.get("/search/posts", searchPosts);
router.get("/search", searchAll);

export default router;

