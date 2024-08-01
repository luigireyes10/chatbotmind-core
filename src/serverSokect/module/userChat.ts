import type { Socket, Server } from 'socket.io';

import Message from '../models/MessageModel';
type Message = {
    to: string;
    message: string;
    from: string;
}

export const handleChatUser = (socket: Socket, uid, io: Server ) => {
    socket.join(uid);

    socket.on('send-message', async (data: Message) => {
        const { to } = data;

        console.log('message', data);
        const newMessage = await new Message({
            ...data
        }).save();

        io.to(to).emit('message-received', newMessage);
        
    });
/* 
    socket.on('disconnect', () => {
        socket.leave(uid);
    });
 */
} 