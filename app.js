import express from 'express'
import routes from './src/routes/index.js'
import cors from 'cors'
import './src/config/db.js'
import './src/config/cloudinary.js'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import Message from './src/modules/message/models/message_model.js'
import { createConversation } from './src/modules/message/db/conversation.js'


const port = 3000
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost/5173/",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors(
    {
        origin: ["https://snap-talk-web.netlify.app/", "http://localhost/5173/"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)


io.on('connection', (socket) => {
    try {
        console.log(socket.handshake?.headers)
        const token = socket.handshake?.headers?.cookie?.split('token=')[1];
        const { _id } = jwt.verify(token, process?.env?.JWT_KEY);
        if (_id) {
            socket.join(_id);
            console.log(`User connected with ID: ${_id}`);
        }
    } catch (error) {
        console.log('Socket authentication error:', error);
        socket.disconnect();
        return;
    }

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });



    socket.on("send-message", async (data, cb) => {
        try {
            const sockets = await io.in(data.roomId).fetchSockets();
            console.log(sockets.map(s => s));


            const conversation = createConversation({
                participants: [data?.sender]
            })
            // const msg = await Message.create(data);
            io.to(data?.userId).emit("recieve-message", data.message);

            cb({ status: "ok" });
        } catch (err) {
            console.log(err)
            cb({ status: "error", message: err });
        }
    });


    socket.on("getmyrooms", () => {
        const rooms = [...socket.rooms];
        const isInRoom = socket.rooms.has(socket.id);
        console.log("Actual joined rooms:", rooms);
        socket.emit("myrooms", rooms);
    });

});


httpServer.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
