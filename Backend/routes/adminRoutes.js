import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
import { isValidObjectId } from 'mongoose';
import { getAllCompaniesAdmin, deleteCompanyAdmin , getAllJobsAdmin, deleteJobAdmin } from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/all-companies', isAuthenticated, isAdmin, getAllCompaniesAdmin);
adminRouter.delete('/companies/:companyId', isAuthenticated, isAdmin, isValidObjectId('companyId'), deleteCompanyAdmin);
adminRouter.get('/jobs', isAuthenticated, isAdmin, getAllJobsAdmin);
adminRouter.delete('/jobs/:jobId', isAuthenticated, isAdmin, isValidateObjectId('jobId'), deleteJobAdmin)


export default adminRouter;