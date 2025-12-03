import { Router } from "express";
import multer from "multer";
import imageUploadController from "./controllers/uploadimage.js";
import videoUploadController from "./controllers/uploadvideo.js";

const uploadRoutes = Router()

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

uploadRoutes.post('/image', upload.single("image"), imageUploadController)
uploadRoutes.post('/video', upload.single("video"), videoUploadController)

export default uploadRoutes