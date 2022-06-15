import mongoose, { Schema } from 'mongoose';

const selectListSchema = new Schema(
    {
        name: { type: String },
        options: { type: Array },
        property: { type: String },
    },
    {
        timestamp: true,
    }
);

export const SelectList = mongoose.model('SelectList', selectListSchema);
