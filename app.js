import express from 'express'
import routes from './src/routes/index.js'
import cors from 'cors'
import './src/config/db.js'
import './src/config/cloudinary.js'
import cookieParser from 'cookie-parser'


const port = 3000
const app = express()

app.use(cors(
    {
        origin: 'https://snap-talk-web.netlify.app/',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
