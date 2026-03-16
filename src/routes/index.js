import express, { Router } from 'express'
import userRoutes from '../modules/user/routes.js';
import authRoutes from '../modules/auth/routes.js';
import tokenVerification from '../middlewares/token_verification.js';
import uploadRoutes from '../modules/upload/routes.js';
import conversationRoutes from '../modules/conversation/routes.js';

const routes = Router();


routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/upload', uploadRoutes)
routes.use('/conversations', conversationRoutes)

export default routes