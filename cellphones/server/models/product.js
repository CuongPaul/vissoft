import mongoose, { Schema } from 'mongoose';

const reviewProductSchema = new Schema(
    {
        name: { type: String },
        star: { type: Number },
        comment: { type: String },
    },
    {
        timestamps: true,
    }
);

const replieCommentProductSchema = new Schema({
    content: { type: String },
    isAdmin: { type: Boolean },
    nameUser: { type: String },
    byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const commentProductSchema = new Schema({
    author: { type: String },
    status: { type: String },
    avatar: { type: String },
    content: { type: String },
    isAdmin: { type: Boolean },
    replies: [replieCommentProductSchema],
    byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const productSchema = new Schema(
    {
        blog: { type: String },
        image: { type: String },
        amount: { type: Number },
        rating: { type: Number },
        numReviews: { type: Number },
        reviews: [reviewProductSchema],
        cloudinary_id: { type: String },
        comments: [commentProductSchema],
        type: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        salePrice: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model('Product', productSchema);
