import { Request, Response } from 'express';
import {UserModel} from "../data/"
import mongoose from 'mongoose';

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
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const registerData = req.body;
        if( req.body.role === 'trainer' ) {
        const newRegister = new UserModel(registerData);
        await newRegister.save();
        res.status(201).json(newRegister);
        res.send('Trainer con el nombre ' + registerData.fullName + ' guardado correctamente');
        } else if (req.body.role === 'client') {
          const newRegister = new UserModel(registerData);
          await newRegister.save();
       res.send('Usuario con el nombre ' + registerData.fullName + ' guardado correctamente');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario con nombre ' + req.body.fullName + 'puede ser que ya esté registrado el número telefónico, el correo o falta algún campo.' });
    }
}



export const isTrainer = async ( trainerId: string ) => {
    try {
        const objectId = new mongoose.Types.ObjectId(trainerId);
        const isTrainer = await UserModel.findOne({_id: objectId });
        if (isTrainer && isTrainer.role == 'trainer') {
          return true;
        } else {
          return false;
        }
    } catch (error) {
        console.error('Error checking if is trainer:', error);
        return false;
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });

  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

export const getTrainers = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainers = await UserModel.find({ role: 'trainer' });
    if (trainers.length === 0) {
      res.status(404).json({ error: 'No se encontraron entrenadores' });
    }
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los entrenadores' });
  }
}

export const updateUser = async(req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    const updateData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { newUser: true });
    if (!updatedUser) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch ( error ) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}