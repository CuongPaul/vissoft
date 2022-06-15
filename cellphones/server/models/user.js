import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        isAdmin: { type: Boolean },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);
