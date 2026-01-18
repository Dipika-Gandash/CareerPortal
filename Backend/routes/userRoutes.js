import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile , addNewExperience, addNewEducation, updateUserExperience , updateUserEducation, deleteUserExperience, deleteUserEducation} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const userRouter = Router();

// auth
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", isAuthenticated, logoutUser);

// profile
userRouter.get("/profile", isAuthenticated, getUserProfile);
userRouter.patch("/profile", isAuthenticated, updateUserProfile);

// profile - experience
userRouter.post("/profile/experience", isAuthenticated, addNewExperience);
userRouter.patch("/profile/experience/:expId", isAuthenticated, updateUserExperience);
userRouter.delete("/profile/experience/:expId", isAuthenticated, deleteUserExperience);

// profile - education
userRouter.post("/profile/education", isAuthenticated, addNewEducation);
userRouter.patch("/profile/education/:eduId", isAuthenticated, updateUserEducation);
userRouter.delete("/profile/education/:eduId", isAuthenticated, deleteUserEducation);


export default userRouter;
