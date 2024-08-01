import { getMessages, createMessage, getUsernamesWithMessages, markMessagesAsRead, getUnreadMessages } from "../controllers/message.controller";
import { Router } from "express";
import { auth } from "../middlewares/auth";
const router = Router();

router.post('/', createMessage);

router.get('/:fromId/:toId', async (req, res) => {
    // Pasa req y res a getMessages
    await getMessages(req, res);
});


router.get('/', getUsernamesWithMessages)
router.get('/markAsRead/:userId/:otherUserId', getUnreadMessages);
router.put('/markAsRead/', markMessagesAsRead);

// Nueva ruta para obtener usuarios con mensajes


export default router;