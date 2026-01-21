import { Router } from "express";
import { isRecruiter , isJobSeeker } from "../middlewares/roleMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { applyJob } from "../controllers/applicationController.js";
import { validateObjectId } from "../middlewares/validateObjectIdMiddleware.js";

const applicationRouter = Router();

applicationRouter.post('/:jobId/apply', isAuthenticated, isJobSeeker,validateObjectId('jobId'), applyJob);


export default applicationRouter;

