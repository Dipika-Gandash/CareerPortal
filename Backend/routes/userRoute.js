import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", isAuthenticated, getUserProfile);
userRouter.patch("/profile/update", isAuthenticated, updateUserProfile);
userRouter.post("/logout", isAuthenticated, logoutUser);

export default userRouter;
