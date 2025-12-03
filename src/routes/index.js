import express, { Router } from 'express'
import userRoutes from '../modules/user/routes.js';
import authRoutes from '../modules/auth/routes.js';
import tokenVerification from '../middlewares/tokenVerification.js';
import uploadRoutes from '../modules/upload/routes.js';

const routes = Router();


routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/upload', uploadRoutes)

export default routes