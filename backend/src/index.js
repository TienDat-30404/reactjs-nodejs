const express = require('express');
const http = require('http');
const socketIo = require('socket.io'); // Thêm socket.io

const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/connect.js');
db.connectDB();

const app = express();
const port = process.env.PORT;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Tạo server HTTP
const server = http.createServer(app);

// Tích hợp socket.io với server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Client domain
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Lưu io trong app để dùng trong các controller
app.set('io', io);

// Sự kiện kết nối từ client
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
const routes = require('./routes/index.js');
routes(app);

const errorMiddleware = require('./middlewares/errorMiddleWare');
app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
