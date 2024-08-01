import type { Request, Response } from 'express';
import User from "../models/UserModel";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const user = await new User({ username }).save();
        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.send(users);
    }catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.send(user);
    }catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};