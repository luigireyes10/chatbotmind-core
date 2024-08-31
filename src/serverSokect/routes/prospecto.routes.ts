import { createPropecto, getPropecto } from "../controllers/propsecto.controller";
import { Router } from "express";

const router = Router();

router.post('/', createPropecto);

router.get('/getProspecto', getPropecto);



export default router;