import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { createCompany , getMyCompanies, getCompanyById} from '../controllers/companyController.js';

const companyRouter = Router();

companyRouter.post('/create', isAuthenticated, isRecruiter, createCompany);
companyRouter.get('/my', isAuthenticated, isRecruiter, getMyCompanies);
companyRouter.get('/my/:id', isAuthenticated, isRecruiter, getCompanyById)



export default companyRouter;