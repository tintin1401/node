import { Request, Response } from 'express';
import {UserModel} from "../data/"
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const encryptPassword = async (plainPassword: string): Promise<string> => {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
};

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const registerData = req.body;
    registerData.password = await encryptPassword(registerData.password); //store the hashed password

    const newRegister = new UserModel(registerData);
    await newRegister.save();

    res.status(201).json({ message: `Usuario ${registerData.fullName} con rol ${registerData.role} registrado exitosamente`, user: newRegister });
  } catch (error) {
    res.status(500).json({
      error: `Error al crear el usuario con nombre ${req.body.fullName}. Puede que ya esté registrado el número, correo o falte algún campo de completar.`,
    });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });

  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await encryptPassword(updateData.password);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};



// export const updateUser = async(req: Request, res: Response): Promise<void> => {
//   try {
//     const email = req.params.email;

//     const updateData = req.body;
//     const updatedUser = await UserModel.findByIdAndUpdate(email, updateData, { newUser: true });

//     if (!updatedUser) {
//       res.status(404).json({ error: 'Usuario no encontrado' });
//       return;
//     }
//     res.status(200).json(updatedUser);
//   } catch ( error ) {
//     res.status(500).json({ error: 'Error al actualizar el usuario' });
//   }
// }


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