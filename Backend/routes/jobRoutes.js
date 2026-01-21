import Router from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddleware.js';
import { getAllJobs , getJobById, getRecruiterJobs} from '../controllers/jobController.js';

const jobRouter = Router();

jobRouter.get('/allJobs', isAuthenticated, getAllJobs);
jobRouter.get('/:jobId', isAuthenticated, validateObjectId('jobId'), getJobById);
jobRouter.get('/recruiter', isAuthenticated, isRecruiter, getRecruiterJobs)

export default jobRouter;

