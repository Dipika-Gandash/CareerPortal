import Router from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddleware.js';
import { getAllJobs , getJobById, getRecruiterJobs, updateJobStatus, deleteJob} from '../controllers/jobController.js';

const jobRouter = Router();

jobRouter.get('/allJobs', isAuthenticated, getAllJobs);
jobRouter.get('/recruiter', isAuthenticated, isRecruiter, getRecruiterJobs);
jobRouter.get('/:jobId', isAuthenticated, validateObjectId('jobId'), getJobById);
jobRouter.patch('/:jobId/status', isAuthenticated, isRecruiter, validateObjectId('jobId'), updateJobStatus);
jobRouter.delete('/:jobId', isAuthenticated, isRecruiter, validateObjectId('jobId'), deleteJob)


export default jobRouter;

