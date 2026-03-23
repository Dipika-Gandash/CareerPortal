import { Router } from "express";
import { isRecruiter , isJobSeeker } from "../middlewares/roleMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { applyJob , getUserApplication , getAllApplicants, updateApplicationStatus , cleanInvalidApplications } from "../controllers/applicationController.js";
import { validateObjectId } from "../middlewares/validateObjectIdMiddleware.js";
import { checkRecruiterStatus } from "../middlewares/checkRecruiterStatusMiddleware.js";

const applicationRouter = Router();

applicationRouter.post('/:jobId/apply', isAuthenticated, isJobSeeker,validateObjectId('jobId'), applyJob);
applicationRouter.get('/my-jobs', isAuthenticated, isJobSeeker, getUserApplication);
applicationRouter.get('/:jobId/my-applicants', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('jobId'), getAllApplicants)
applicationRouter.patch('/:applicationId/status', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('applicationId'), updateApplicationStatus);
// applicationRouter.delete('/clean-invalid', cleanInvalidApplications);
export default applicationRouter;

