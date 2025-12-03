import express from 'express'
import routes from './src/routes/index.js';

const port = 3000
const app = express()

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
