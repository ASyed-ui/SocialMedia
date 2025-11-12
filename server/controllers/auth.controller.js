// controllers/auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const JWT_EXPIRES_IN = "1d";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required." });

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered." });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashed });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return limited user info
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error during registration." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error during login." });
  }
};

export const logout = async (req, res) => {
  try {
    // With JWT we can't destroy the token server-side unless using a blacklist.
    // So we simply send success and let the frontend delete the token.
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error during logout." });
  }
};


export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error fetching profile." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    // auth middleware sets req.userId
    if (req.userId !== userId) return res.status(403).json({ message: "Forbidden. You can only update your own profile." });

    const updates = {};
    const { name, bio, profilePic, password } = req.body;
    if (name) updates.name = name;
    if (bio) updates.bio = bio;
    if (profilePic) updates.profilePic = profilePic;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updated = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password -__v");
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error updating profile." });
  }
};
