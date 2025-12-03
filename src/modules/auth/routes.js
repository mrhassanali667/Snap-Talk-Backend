import { Router } from 'express'
import { registerController } from './controllers/register.js';
import { loginController } from './controllers/login.js';

const authRoutes = Router();

authRoutes.post('/login', loginController)
authRoutes.post('/register', registerController)

export default authRoutes