// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  profilePic: { type: String, default: "" },
  bio: { type: String, default: "" },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
