import { Router } from 'express'
import { checkUsernameController, getAllController, getOneController } from './controllers/get.js';
import { postController } from './controllers/post.js';
import { updateController } from './controllers/update.js';
import { deleteController } from './controllers/delete.js'
import { updateProfilePicture } from './services/post.js';

const userRoutes = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `src/modules/upload/storage/${file.fieldname}s`)
    },
    filename: function (req, file, cb) {
        const uniqueId = Date.now().toString(36)
        cb(null, `${uniqueId}-${file.fieldname}.${file.mimetype.split("/")[1]}`)
    }
})


const upload = multer({ storage: storage })

userRoutes.get('/', getAllController)
userRoutes.get('/check-username', checkUsernameController)
userRoutes.get('/user/:id', getOneController)
userRoutes.post('/', postController)
userRoutes.post('/upload-profile', upload.single('image'),)
userRoutes.put('/:id', updateController)
userRoutes.delete('/:id', deleteController)

export default userRoutes