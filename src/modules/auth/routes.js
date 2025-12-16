import { Router } from 'express'
import { registerController } from './controllers/register.js';
import { loginController } from './controllers/login.js';
import { getUserController } from './controllers/getUser.js';
import tokenVerification from '../../middlewares/tokenVerification.js';

const authRoutes = Router();

authRoutes.post('/login', loginController)
authRoutes.post('/register', registerController)
authRoutes.get('/user',tokenVerification, getUserController)

export default authRoutes