import dotenv from 'dotenv';
import express, { Application } from 'express';
dotenv.config();
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import followRoutes from './routes/followRoutes'
import http from 'http';
import { Server } from 'socket.io';



const app: Application = express();
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Connect to the database
connectDB();

// Create Socket.io server
const io = new Server(server);

// Listen for connections
io.on('connection', (socket) => {
  console.log('A user connected');
});
export { io };


// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follows', followRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;