import Router from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddleware.js';
import { getAllJobs } from '../controllers/jobController.js';

const jobRouter = Router();

jobRouter.get('/allJobs', isAuthenticated, getAllJobs);

export default jobRouter;

