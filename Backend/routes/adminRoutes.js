import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
import { getAllCompanies, deleteCompany } from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/all-companies', isAuthenticated, isAdmin, getAllCompanies);
adminRouter.delete('/companies/:companyId', isAuthenticated, isAdmin, deleteCompany);

export default adminRouter;