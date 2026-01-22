import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddleware.js';
import { createCompany , getMyCompanies, getCompanyById , updateCompany, deleteCompany} from '../controllers/companyController.js';
import { createJob } from '../controllers/jobController.js';
import { checkRecruiterStatus } from '../middlewares/checkRecruiterStatusMiddleware.js';

const companyRouter = Router();

companyRouter.post('/create', isAuthenticated, isRecruiter, checkRecruiterStatus, createCompany);
companyRouter.get('/my', isAuthenticated, isRecruiter, getMyCompanies);


companyRouter.get('/:companyId', isAuthenticated, isRecruiter, validateObjectId('companyId'), getCompanyById);
companyRouter.patch('/:companyId', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('companyId'), updateCompany);
companyRouter.delete('/:companyId', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('companyId'), deleteCompany);

companyRouter.post('/:companyId/create-job', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('companyId'), createJob);

export default companyRouter;