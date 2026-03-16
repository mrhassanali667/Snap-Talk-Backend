import { Router } from 'express'
import { getAllController, getOneController } from './controllers/get.js';

const conversationRoutes = Router();

conversationRoutes.get('/', getAllController)
conversationRoutes.get('/conversation/:id', getOneController)

export default conversationRoutes