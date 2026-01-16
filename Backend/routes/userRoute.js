import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile , addNewExperience} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", isAuthenticated, getUserProfile);
userRouter.patch("/profile/update", isAuthenticated, updateUserProfile);
userRouter.post("/profile/update/experience", isAuthenticated, addNewExperience);
userRouter.post("/logout", isAuthenticated, logoutUser);

export default userRouter;
