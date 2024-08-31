import { Request, Response } from "express";
import NotifyMessage from "../models/NotifyMessage";

// Controlador para crear una nueva notificación
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { message, from, to } = req.body;
    const notification = new NotifyMessage({ message, from, to });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la notificación' });
  }
};

// Controlador para obtener las notificaciones de un usuario específico
export const getNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notifications = await NotifyMessage.find({ to: id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  const notificationId = req.params.notificationId;

  try {
    await NotifyMessage.findByIdAndUpdate(notificationId, { READ: true });
    res.json({ message: 'Notificación marcada como leída' });
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar la notificación como leída' });
  }
};


