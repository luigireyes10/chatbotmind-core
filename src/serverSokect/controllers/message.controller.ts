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
      $and: [
        {
          $or: [
            { from: fromId, to: toId },
            { from: toId, to: fromId },
          ],
        },
        { Estado: 'Active' },
      ],
    }).sort({ createdAt: 1 });

    return res.send(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

  export const updateMessageChatStatusToInactive = async (req: Request, res: Response) => {
    try {
      const { fromId, toId } = req.body;
  
      await Message.updateMany(
        {
          $or: [
            { from: fromId, to: toId },
            { from: toId, to: fromId },
          ],
        },
        { Estado: 'Inactive' }
      );
  
      return res.send({ message: 'Estado de los mensajes actualizado a Inactive' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };

  export const updateMessageStatusToInactive = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
  
      await Message.updateOne(
        { _id: id },
        { Estado: 'Inactive' }
      );
  
      return res.send({ message: 'Estado del mensaje actualizado a Inactive' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };

  export const editMessageById = async (req: Request, res: Response) => {
    try {
      const {id, newContent } = req.body;
  
      // Actualizar el contenido del mensaje directamente
      const updatedMessage = await Message.findByIdAndUpdate(
        {_id: id},
        { message: newContent },
        { new: true, runValidators: true }
      );
  
      if (!updatedMessage) {
        return res.status(404).send({ message: 'Mensaje no encontrado' });
      }
  
      return res.send({ message: 'Mensaje actualizado correctamente' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Error interno del servidor' });
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

