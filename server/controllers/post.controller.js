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
      .populate('userId', 'name') // <-- populate only the name
      .populate('likes', 'name') // populate likers' names for convenience
      .populate('dislikes', 'name');
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

// Toggle like/unlike for a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    const userId = req.userId;
    const indexLike = post.likes.findIndex((id) => id.toString() === userId);
    const indexDislike = post.dislikes.findIndex((id) => id.toString() === userId);
    let action = "liked";
    if (indexLike === -1) {
      // not liked yet => add
      post.likes.push(userId);
      // remove from dislikes if present
      if (indexDislike !== -1) post.dislikes.splice(indexDislike, 1);
    } else {
      // already liked => remove
      post.likes.splice(indexLike, 1);
      action = "unliked";
    }

    await post.save();

    // Optionally populate user info for response
    const populated = await Post.findById(post._id).populate('userId', 'name').populate('likes', 'name').populate('dislikes', 'name');
    return res.json({ post: populated, action });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error toggling like." });
  }
};

// Toggle dislike/undislike for a post
export const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    const userId = req.userId;
    const indexDislike = post.dislikes.findIndex((id) => id.toString() === userId);
    const indexLike = post.likes.findIndex((id) => id.toString() === userId);
    let action = "disliked";
    if (indexDislike === -1) {
      // not disliked yet => add
      post.dislikes.push(userId);
      // remove from likes if present
      if (indexLike !== -1) post.likes.splice(indexLike, 1);
    } else {
      // already disliked => remove
      post.dislikes.splice(indexDislike, 1);
      action = "undisliked";
    }

    await post.save();

    const populated = await Post.findById(post._id).populate('userId', 'name').populate('likes', 'name').populate('dislikes', 'name');
    return res.json({ post: populated, action });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error toggling dislike." });
  }
};
