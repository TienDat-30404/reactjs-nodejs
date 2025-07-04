import express from 'express';
import { Server } from "socket.io";

import http from 'http';
// import * as socketIo from 'socket.io';  // Thêm socket.io
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/connect.js';
connectDB();

import "./utils/cronJobs/discountStatus.js";
import "./utils/cronJobs/voucherStatus.js";
const app = express();
const port = process.env.PORT;

import cookieParser from 'cookie-parser';
app.use(cookieParser());


// errorHandler
import errorHandler from './utils/errorHandler.js';

app.use(express.json());

import cors from 'cors';
const corsOptions = {
  origin: process.env.PORT_CLIENT,
  credentials: true,
};
app.use(cors(corsOptions));
// Tạo server HTTP
const server = http.createServer(app);

// Tích hợp socket.io với server
const io = new Server(server, {
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
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
import routes from './routes/index.js';
routes(app);

import errorMiddleware from './middlewares/errorMiddleWare.js';
app.use(errorMiddleware);

app.use(errorHandler);


server.listen(port, async() => {
  console.log(`Server is running on port ${port}`);
  // }
});