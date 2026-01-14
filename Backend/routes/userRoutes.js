import express from "express";
import User from "../models/userSchema";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
    }

    await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
