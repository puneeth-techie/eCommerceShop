import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  const bearer = req.headers.authorization.startsWith("Bearer");
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token && bearer) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } catch (e) {
    throw new Error(e.message);
  }
});

export { protect };
