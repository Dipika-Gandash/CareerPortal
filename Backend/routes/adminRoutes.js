import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
import { validateObjectId } from "../middlewares/validateObjectIdMiddleware.js";
import {
  getAllCompaniesAdmin,
  deleteCompanyAdmin,
  getAllJobsAdmin,
  deleteJobAdmin,
  getRecruiters,
  updateRecruiterStatus
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get(
  "/all-companies",
  isAuthenticated,
  isAdmin,
  getAllCompaniesAdmin,
);
adminRouter.delete(
  "/companies/:companyId",
  isAuthenticated,
  isAdmin,
  validateObjectId("companyId"),
  deleteCompanyAdmin,
);
adminRouter.get("/jobs", isAuthenticated, isAdmin, getAllJobsAdmin);
adminRouter.delete(
  "/jobs/:jobId",
  isAuthenticated,
  isAdmin,
  validateObjectId("jobId"),
  deleteJobAdmin,
);

adminRouter.get("/recruiters", isAuthenticated, isAdmin, getRecruiters);
adminRouter.patch("/recruiters/:recruiterId/status", isAuthenticated, isAdmin, validateObjectId('recruiterId'), updateRecruiterStatus);

export default adminRouter;
