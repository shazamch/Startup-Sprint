require('dotenv').config();
const express = require('express');
const dbConnect = require('./src/utils/dbConnect.js');
const responseHandler = require('./src/middlewares/responseHandler.js');
const authenticateToken = require('./src/middlewares/authToken.js');
const cors = require('./src/middlewares/cors.js');
const logger = require('./src/middlewares/logger.js');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173',"http://52.71.51.45"],
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

app.use(express.json());
app.use(cors);
app.use(logger);
app.use(responseHandler);

app.use('/protected', authenticateToken);

const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const postRoutes = require('./src/routes/postRoutes.js');
const messageRoutes = require('./src/routes/messageRoutes.js');
const conversationRoutes = require('./src/routes/conversationRoutes.js');
const investmentRoutes = require('./src/routes/investmentRoutes.js');
const startupRoutes = require('./src/routes/startupRoutes.js');
const requestRoutes = require('./src/routes/requestRoutes.js');

app.use('/auth', authRoutes);
app.use('/protected/users', userRoutes);
app.use('/protected/posts', postRoutes);
app.use('/protected/message', messageRoutes);
app.use('/protected/conversation', conversationRoutes);
app.use('/protected/investment', investmentRoutes);
app.use('/protected/startups', startupRoutes);
app.use('/protected/requets', requestRoutes);

const port = process.env.PORT || 3000;

// Socket.io Connection and Event Handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(port, () => {
    dbConnect();
    console.log("Server Running at Port", port);
});
