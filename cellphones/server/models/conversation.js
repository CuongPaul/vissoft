import mongoose, { Schema } from 'mongoose';

const conversationSchema = new Schema(
    {
        name: { type: String },
        userID: { type: String },
        lastMessage: { type: String },
        seen: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export const Conversation = mongoose.model('Conversation', conversationSchema);
