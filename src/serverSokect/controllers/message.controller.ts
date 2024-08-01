  import type { Request, Response } from "express";
import Message from "../models/MessageModel";
import User from '../models/UserModel';

export const getUsernamesWithMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({});

    // Extraer los IDs de los usuarios que han enviado mensajes
    const userIds = messages.reduce((ids: Set<string>, message) => {
      return ids.add(String(message.from));
    }, new Set<string>());

    // Buscar los usuarios en la base de datos
    const users = await User.find({
      _id: { $in: Array.from(userIds) }
    });

    // Extraer los nombres de usuario y los IDs
    const userInfos = users.map(user => ({ _id: user._id, username: user.username, status: user.status }));

    return res.send(userInfos);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
export const getMessages = async (req: Request, res: Response) => {
    try {
      const { fromId, toId } = req.params;
  
      const messages = await Message.find({
        $or: [
          { from: fromId, to: toId },
          { from: toId, to: fromId },
        ],
      }).sort({ createdAt: 1 });
  
      return res.send(messages);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };
  export const getUnreadMessages = async (req: Request, res: Response) => {
    try {
      const { userId, otherUserId } = req.params;
  
      const messages = await Message.find({ from: userId, to: otherUserId, read: false });
  
      return res.send(messages);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
};
  export const markMessagesAsRead = async (req: Request, res: Response) => {
    try {
      const { userId, otherUserId } = req.body;
  
      await Message.updateMany({ from: userId, to: otherUserId, read: false }, { read: true });
  
      return res.send({ message: 'Messages marked as read' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };
  export const createMessage = async (req: Request, res: Response) => {
    try {
      const { from, message, to, media } = req.body;
  
      let message_type;

      if (media) {
        message_type = 1; // media
      } else if (message) {
        message_type = 2; // message
      }
  
      const newMessage = await new Message({
        from,
        to,
        message,
        media,
        message_type,
        read: false
      }).save();
  
      console.log(`Mensaje a guardar: ${message}`);
      console.log(`Remitente: ${from}`);
      console.log(`Destinatario: ${to}`);
      console.log(`Media: ${JSON.stringify(media)}`); 
      console.log(`Tipo de mensaje: ${message_type}`); 
  
      return res.send(newMessage);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };

