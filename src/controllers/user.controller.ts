import { Request, Response } from 'express';
import {UserModel} from "../data/"

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
 try {
    const { fullName } = req.params; // or req.query/fullName if sent as a query param
    const user = await UserModel.findOne({ fullName });
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};
