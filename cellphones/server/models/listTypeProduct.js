import mongoose, { Schema } from 'mongoose';

const ListTypeProductSchema = new Schema(
    {
        name: { type: String },
        image: { type: String },
        cloudinary_id: { type: String },
    },
    {
        timestamps: true,
    }
);

export const ListTypeProduct = mongoose.model('ListTypeProduct', ListTypeProductSchema);
