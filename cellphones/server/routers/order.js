import express from 'express';
import {
    createOrder,
    getAllOrder,
    deleteOrder,
    paidProduct,
    updateOrder,
    printOrderGHN,
    shippingProduct,
    getAllOrderPaid,
    getAllOrderPaypal,
    clientCancelOrder,
    getOrderPaidByUser,
    getAllOrderInAMonth,
    getAllOrderPendding,
    getAllOrderShipping,
    getOrderPaypalByUser,
    getOrderPenddingByUser,
    getOrderShippingByUser,
} from '../controllers/order.js';

const OrderRouter = express.Router();

OrderRouter.post('/create', createOrder);
OrderRouter.put('/paid/:id', paidProduct);
OrderRouter.post('/update/:id', updateOrder);
OrderRouter.get('/print/:id', printOrderGHN);
OrderRouter.delete('/delete/:id', deleteOrder);
OrderRouter.post('/cancel/:id', clientCancelOrder);
OrderRouter.put('/shipping/:id', shippingProduct);

OrderRouter.get('/', getAllOrder);
OrderRouter.get('/orderPaid', getAllOrderPaid);
OrderRouter.get('/orderPaypal', getAllOrderPaypal);
OrderRouter.get('/orderPendding', getAllOrderPendding);
OrderRouter.get('/orderShipping', getAllOrderShipping);

OrderRouter.get('/:id', getAllOrder);
OrderRouter.get('/orderpaid/:id', getOrderPaidByUser);
OrderRouter.get('/allOrderInAMonth', getAllOrderInAMonth);
OrderRouter.get('/orderPaypal/:id', getOrderPaypalByUser);
OrderRouter.get('/orderPendding/:id', getOrderPenddingByUser);
OrderRouter.get('/orderShipping/:id', getOrderShippingByUser);

export default OrderRouter;
