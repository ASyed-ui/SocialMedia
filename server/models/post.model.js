// models/post.model.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, trim: true },
  image: { type: String, default: "" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;
