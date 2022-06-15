import express from 'express';

import { inpPayment, createPayment, returnPayment } from '../controllers/payment.js';

const PaymentRouter = express.Router();

PaymentRouter.get('/vnpay_ipn', inpPayment);
PaymentRouter.post('/create', createPayment);
PaymentRouter.get('/vnpay_return', returnPayment);

export default PaymentRouter;
