import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
import { getAllCompanies } from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/all-companies', isAuthenticated, isAdmin, getAllCompanies);

export default adminRouter;