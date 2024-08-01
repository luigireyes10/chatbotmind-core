import type { Request, Response } from "express";
import Contact from "../models/contactModel";

export const addContact = async (req: Request, res: Response) => {
    try {
        const { userId, contactId } = req.body;
  
        const newContact = await new Contact({
            userId,
            contactId
        }).save();
  
        return res.send(newContact);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const getContacts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
  
        const contacts = await Contact.find({
            userId: id
        }).populate('contactId');  // Esto asume que quieres obtener los detalles completos del contacto
  
        return res.send(contacts);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

