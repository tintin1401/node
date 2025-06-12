import { Request, Response } from 'express';
import {UserModel} from "../data/"

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
 try {
    const { fullName, email } = req.body; // Add more attributes as needed
    const filter: any = {};
    if (fullName) filter.fullName = fullName;
    if (email) filter.email = email;

    const user = await UserModel.findOne(filter);
    
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};
