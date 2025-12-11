// controllers/search.controller.js
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// Search users
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const searchQuery = q.trim();
    
    // Search by name or email (case-insensitive)
    const users = await User.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } }
      ]
    })
    .select("name email profilePic bio")
    .limit(20);

    return res.json(users);
  } catch (err) {
    console.error("Error searching users:", err);
    return res.status(500).json({ message: "Server error searching users." });
  }
};

// Search posts
export const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const searchQuery = q.trim();
    
    // Search posts by content
    const posts = await Post.find({
      content: { $regex: searchQuery, $options: "i" }
    })
    .populate("userId", "name profilePic")
    .populate("likes", "name")
    .populate("dislikes", "name")
    .sort({ createdAt: -1 })
    .limit(50);

    return res.json(posts);
  } catch (err) {
    console.error("Error searching posts:", err);
    return res.status(500).json({ message: "Server error searching posts." });
  }
};

// Combined search (users and posts)
export const searchAll = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.json({ users: [], posts: [] });
    }

    const searchQuery = q.trim();
    
    // Search users
    const users = await User.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } }
      ]
    })
    .select("name email profilePic bio")
    .limit(10);

    // Search posts
    const posts = await Post.find({
      content: { $regex: searchQuery, $options: "i" }
    })
    .populate("userId", "name profilePic")
    .populate("likes", "name")
    .populate("dislikes", "name")
    .sort({ createdAt: -1 })
    .limit(20);

    return res.json({ users, posts });
  } catch (err) {
    console.error("Error searching:", err);
    return res.status(500).json({ message: "Server error searching." });
  }
};

