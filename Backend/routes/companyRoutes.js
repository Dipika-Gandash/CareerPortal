import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isRecruiter } from '../middlewares/roleMiddleware.js';
import { createCompany } from '../controllers/companyController.js';

const companyRouter = Router();

companyRouter.post('/create', isAuthenticated, isRecruiter, createCompany);



export default companyRouter;