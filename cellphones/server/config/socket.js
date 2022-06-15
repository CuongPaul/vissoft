import { Server } from 'socket.io';

import { Conversation } from '../models';

const connectSocket = (server) => {
    const io = new Server(server, {
        cors: {
            credentials: true,
            methods: ['GET', 'POST'],
            origin: 'http://localhost:3000',
            allowedHeaders: ['my-custom-header'],
        },
    });

    io.on('connection', (socket) => {
        socket.on('join_conversation', async (userID) => {
            const conversation = await Conversation.findOne({ userID });

            if (conversation) {
                socket.join(String(conversation._id));
            } else {
                return;
            }
        });

        socket.on('admin_join_conversation', (conversationID) => {
            socket.join(conversationID);
        });

        socket.on('create_conversation', async (currentUser) => {
            const conversation = new Conversation({
                name: currentUser.name,
                userID: currentUser._id,
            });
            const newConversation = await conversation.save();

            socket.join(String(newConversation._id));
            socket.emit('response_room', newConversation);
        });

        socket.on('chat', async (data) => {
            const { _id, sender, message, conversationID } = data;

            const newConversation = await Conversation.updateOne(
                { _id: conversationID },
                { lastMessage: message }
            );
            io.emit('last_message', newConversation);

            const payload = { _id, sender, message, conversationID };
            io.to(conversationID).emit('new_message', payload);

            const conversation = await Conversation.findOne({ _id: conversationID });
            io.emit('show_me', conversation);
        });

        socket.on('disconnect', () => {
            io.emit('user_leave', 'Doi phuong da roi khoi cuoc tro chuyen');
        });
    });
};

export default connectSocket;
