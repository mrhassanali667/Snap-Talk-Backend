import { v2 as cloudinary } from 'cloudinary'
import ENV from '../constants/index.js'
import 'dotenv/config'


cloudinary.config({
    cloud_name: ENV.COUDINARY_CLOUD_NAME,
    api_key: ENV.COUDINARY_API_KEY,
    api_secret: ENV.COUDINARY_API_SECRET,
});