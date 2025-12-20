import express from "express";
import User from "./userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Register or Login
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Username and password are required." });
    }

    if (req.query.action === "register") {
      return registerUser(req, res);
    } else {
      return authenticateUser(req, res);
    }
  })
);

async function registerUser(req, res) {
  const { username, password } = req.body;

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      msg: "Password must be at least 8 characters long and include letters, numbers, and special characters.",
    });
  }

  const existing = await User.findByUserName(username);
  if (existing) {
    return res.status(400).json({ success: false, msg: "User already exists." });
  }

  const user = await User.create({ username, password });

  const token = jwt.sign({ username: user.username }, process.env.SECRET);

  return res.status(201).json({
    success: true,
    msg: "User successfully created.",
    token: "Bearer " + token,
  });
}

async function authenticateUser(req, res) {
  const { username, password } = req.body;

  const user = await User.findByUserName(username);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, msg: "Authentication failed. User not found." });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, msg: "Wrong password." });
  }

  const token = jwt.sign({ username: user.username }, process.env.SECRET);

  return res.status(200).json({
    success: true,
    token: "Bearer " + token,
    username: user.username,
  });
}

export default router;
