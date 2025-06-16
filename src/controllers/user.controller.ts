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
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

// export const register = async (req: Request, res: Response): Promise<void> => {
//     const { fullName, phone, email, password, role, profilePictureUrl } = req.body; 

//     try {
//       const newUser = new UserModel({
//         fullName,
//         phone,
//         email,
//         password,
//         role,
//         profilePictureUrl
//       });

//       await newUser.save();
//       res.send('Usuario con el nombre ' + fullName + ' guardado correctamente');
//     } catch (error) {
//       console.error('Error al guardar el usuario:', error);
//     }
// };

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const registerData = req.body;
        const newRegister = new UserModel(registerData);
        await newRegister.save();
        res.status(201).json(newRegister);
       res.send('Usuario con el nombre ' + registerData.fullName + ' guardado correctamente');
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario con nombre ' + req.body.fullName + 'puede ser que ya esté registrado el número telefónico, el correo o falta algún campo.' });
    }
}

export const isTrainer = async (userData: { fullName: string, email: string, role: string }) => {
    try {
        const { fullName, email, role } = userData;
        const isTrainer = await UserModel.findOne({
            fullName, 
            email, 
            role: 'trainer' // Check if the user is a trainer
        });

        if (isTrainer) {
           return false; 
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error checking if is trainer:', error);
    }
}
