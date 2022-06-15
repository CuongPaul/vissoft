import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';

import chatRouter from './routers/chat.js';
import userRouter from './routers/user.js';
import orderRouter from './routers/order.js';
import connectDB from './config/database.js';
import connectSocket from './config/socket.js';
import uploadRouter from './routers/upload.js';
import paymentRouter from './routers/payment.js';
import productRouter from './routers/product.js';
import selectListrouter from './routers/selectList.js';
import listTypeProductRouter from './routers/listTypeProduct.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const server = createServer(app);

connectDB();
connectSocket(server);

app.use(cors());

app.use('/chat', chatRouter);
app.use('/user', userRouter);
app.use('/api', uploadRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/products', productRouter);
app.use('/selectList', selectListrouter);
app.use('/typeList', listTypeProductRouter);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
