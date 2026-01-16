import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decodedMessage = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedMessage.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
