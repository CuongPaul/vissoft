import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        name: { type: String },
        token: { type: String },
        status: { type: String },
        totalPrice: { type: Number },
        order_code: { type: String },
        cancelOrder: { type: Boolean },
        to_ward_code: { type: String },
        paymentMethod: { type: String },
        to_district_id: { type: Number },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: String, required: true },
                image: { type: String, required: true },
                salePrice: { type: Number, required: true },
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            },
        ],
        shippingAddress: {
            ward: { type: String },
            name: { type: String },
            phone: { type: String },
            detail: { type: String },
            province: { type: String },
            district: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

export const OrderModel = mongoose.model('Order', orderSchema);
