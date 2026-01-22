import Router from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddleware.js';
import { getAllJobs , getJobById, getRecruiterJobs, updateJobStatus, deleteJob} from '../controllers/jobController.js';
import { checkRecruiterStatus } from '../middlewares/checkRecruiterStatusMiddleware.js';

const jobRouter = Router();

jobRouter.get('/allJobs', isAuthenticated, getAllJobs);
jobRouter.get('/my-jobs', isAuthenticated, isRecruiter, getRecruiterJobs);
jobRouter.get('/:jobId', isAuthenticated, validateObjectId('jobId'), getJobById);
jobRouter.patch('/:jobId/status', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('jobId'), updateJobStatus);
jobRouter.delete('/:jobId', isAuthenticated, isRecruiter, checkRecruiterStatus, validateObjectId('jobId'), deleteJob)


export default jobRouter;

