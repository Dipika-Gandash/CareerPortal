import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddleware.js';
import { createCompany , getMyCompanies, getCompanyById , updateCompany, deleteCompany} from '../controllers/companyController.js';
import { createJob } from '../controllers/jobController.js';

const companyRouter = Router();

companyRouter.post('/create', isAuthenticated, isRecruiter, createCompany);
companyRouter.get('/my', isAuthenticated, isRecruiter, getMyCompanies);


companyRouter.get('/:companyId', isAuthenticated, isRecruiter, validateObjectId('companyId'), getCompanyById);
companyRouter.patch('/:companyId', isAuthenticated, isRecruiter, validateObjectId('companyId'), updateCompany);
companyRouter.delete('/:companyId', isAuthenticated, isRecruiter, validateObjectId('companyId'), deleteCompany);

companyRouter.post('/:companyId/create-job', isAuthenticated, isRecruiter, validateObjectId('companyId'), createJob);

export default companyRouter;