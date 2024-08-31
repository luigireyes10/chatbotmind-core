import { getMessages, createMessage, updateMessageStatusToInactive,updateMessageChatStatusToInactive,editMessageById, getUsernamesWithMessages, markMessagesAsRead, getUnreadMessages } from "../controllers/message.controller";
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
router.put('/update/', updateMessageStatusToInactive);
router.put('/update/chat', updateMessageChatStatusToInactive);
router.put('/update/chatmessage', editMessageById);


// Nueva ruta para obtener usuarios con mensajes


export default router;