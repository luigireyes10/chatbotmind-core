
import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../jwt";
export const auth = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ message: 'Access denied' });
    }

    const user = verifyToken(token);

    if (!user) {
        return res.status(401).send({ message: 'Invalid token' });
    }

    req['user'] = user;
    next();
};