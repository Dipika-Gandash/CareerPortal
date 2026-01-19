import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { createCompany , getMyCompanies, getCompanyById , updateCompany, deleteCompany} from '../controllers/companyController.js';

const companyRouter = Router();

companyRouter.post('/create', isAuthenticated, isRecruiter, createCompany);
companyRouter.get('/my', isAuthenticated, isRecruiter, getMyCompanies);
companyRouter.get('/:id', isAuthenticated, isRecruiter, getCompanyById);
companyRouter.patch('/:id', isAuthenticated, isRecruiter, updateCompany);
companyRouter.delete('/:id', isAuthenticated, isRecruiter, deleteCompany);

export default companyRouter;