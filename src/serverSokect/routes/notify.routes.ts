import { Router } from "express";
import {
  createNotification,
  getNotificationsByUser,

} from "../controllers/notify.controller";

const router = Router();
router.post("/", createNotification);
router.get("/:id", getNotificationsByUser);


export default router;
