import type { Request, Response } from "express";
import Prospecto from "../models/prospectoModel";



export const createPropecto = async (req: Request, res: Response) => {
    try {
      const {Desc_Prospecto, ID_Prospecto,ID_Cliente } = req.body;
  
      const newPropescto = await new Prospecto({
        Desc_Prospecto,
        ID_Prospecto,
        ID_Cliente,
        Estado: "A"
      }).save();

      console.log(`Mensaje a guardar: ${Desc_Prospecto}`);
      console.log(`Prospecto: ${ID_Prospecto}`);
      console.log(`Cliente: ${ID_Cliente}`);
  
      return res.send(newPropescto);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };

  export const getPropecto = async (req: Request, res: Response) => {
    try {
      const prospectos = await Prospecto.find({ Estado: 'A' })
        .populate('ID_Cliente')
        .sort({ createdAt: 1 });
  
      return res.send(prospectos);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
};
