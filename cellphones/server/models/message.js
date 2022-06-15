import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
    {
        message: { type: String },
        sender: { type: String, ref: 'User' },
        createAt: { type: Date, default: Date.now },
        conversationID: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model('Message', MessageSchema);
