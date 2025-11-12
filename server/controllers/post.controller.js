import Post from "../models/post.model.js";

// Create a post
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required." });

    const post = new Post({
      userId: req.userId,
      content,
      image: image || ""
    });

    await post.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: "Server error creating post." });
  }
};

// Get all posts
export const getPost = async (req, res) => {
  try {
    // Populate userId to get the user's name
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name'); // <-- populate only the name
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error fetching post." });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.content = req.body.content ?? post.content;
    post.image = req.body.image ?? post.image;
    await post.save();

    return res.json(post);
  } catch {
    return res.status(500).json({ message: "Server error updating post." });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.deleteOne({ _id: req.params.id });
    return res.json({ message: "Post deleted." });
  } catch {
    return res.status(500).json({ message: "Server error deleting post." });
  }
};
