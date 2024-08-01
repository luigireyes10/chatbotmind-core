import { Router } from "express";
//const router = expres.Router();
const whatsappCpntroller = require("../controllers/whatsappcontrollers")

const whatsappRouter = Router()

whatsappRouter.get("/whatsapp", whatsappCpntroller.VerifyToken)
whatsappRouter.post("/whatsapp", whatsappCpntroller.ReceiveMessage)

export default whatsappRouter