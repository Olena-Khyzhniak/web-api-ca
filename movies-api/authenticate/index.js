import jwt from "jsonwebtoken";
import User from "../api/users/userModel.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No authorization header" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ msg: "Invalid authorization format" });
    }

    const token = parts[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token", error: err.message });
    }

    const user = await User.findByUserName(decoded.username);

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: "Authentication error", error: err.message });
  }
};

export default authenticate;
