import express from 'express';

import {
    postSaveMessage,
    getAllConversation,
    getMessageByConversation,
} from '../controllers/chat.js';

const chatRouter = express.Router();

chatRouter.get('/', getAllConversation);
chatRouter.post('/save', postSaveMessage);
chatRouter.get('/message', getMessageByConversation);

export default chatRouter;
