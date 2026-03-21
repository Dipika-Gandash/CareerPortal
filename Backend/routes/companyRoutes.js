import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddleware.js';
import { createCompany , getMyCompanies, getCompanyById , updateCompany, deleteCompany , getCompanyJobs} from '../controllers/companyController.js';
import { createJob } from '../controllers/jobController.js';
import { checkRecruiterStatus } from '../middlewares/checkRecruiterStatusMiddleware.js';
import { uploadImage } from '../middlewares/multer.js';

const companyRouter = Router();

companyRouter.post('/create', isAuthenticated, isRecruiter, checkRecruiterStatus, uploadImage.single("companyLogo"), createCompany);
companyRouter.get('/my', isAuthenticated, isRecruiter, getMyCompanies);

companyRouter.get('/:companyId', isAuthenticated, isRecruiter, validateObjectId('companyId'), getCompanyById);
companyRouter.patch('/:companyId', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('companyId'), uploadImage.single("companyLogo"), updateCompany);
companyRouter.delete('/:companyId', isAuthenticated, isRecruiter, validateObjectId('companyId'), deleteCompany);

companyRouter.post('/:companyId/create-job', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('companyId'), createJob);

companyRouter.get('/:companyId/jobs', isAuthenticated, isRecruiter, validateObjectId('companyId'), getCompanyJobs)

export default companyRouter;