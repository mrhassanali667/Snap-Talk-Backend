import { Router } from 'express'
import { getAllController, getOneController } from './controllers/get.js';
import { postController } from './controllers/post.js';
import { updateController } from './controllers/update.js';
import { deleteController } from './controllers/delete.js'

const userRoutes = Router();

userRoutes.get('/', getAllController)
userRoutes.get('/user/:id', getOneController)
userRoutes.post('/', postController)
userRoutes.put('/:id', updateController)
userRoutes.delete('/:id', deleteController)

export default userRoutes