// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ message: "Authorization required." });

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId; // attach userId to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
