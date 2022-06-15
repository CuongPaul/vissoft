import expressAsyncHandler from 'express-async-handler';

import { Message, Conversation } from '../models';

export const getAllConversation = expressAsyncHandler(async (req, res) => {
    try {
        const conversations = await Conversation.find().sort({ updatedAt: -1 });

        res.send(conversations);
    } catch (error) {
        console.error(error);
    }
});

export const getMessageByConversation = expressAsyncHandler(async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            $or: [{ userID: req.query.userID }, { _id: req.query.conversationID }],
        });

        if (conversation) {
            Message.find({ conversationID: conversation._id })
                .populate('conversationID')
                .exec((err, messages) => {
                    if (messages) {
                        return res.status(200).json({ messageList: messages });
                    } else {
                        return res.status(400).json({ message: 'Thất bại' });
                    }
                });
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
    }
});

export const postSaveMessage = expressAsyncHandler(async (req, res) => {
    try {
        const message = new Message({
            sender: req.body.sender,
            message: req.body.message,
            conversationID: req.body.conversationID,
        });
        const newMessage = await message.save();

        res.send(newMessage);
    } catch (error) {
        console.error(error);
    }
});
