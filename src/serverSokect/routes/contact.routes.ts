import { addContact, getContacts } from "../controllers/contact.controller";
import { Router } from "express";

const router = Router();

router.post('/', addContact);

router.get('/:id', getContacts);


export default router;