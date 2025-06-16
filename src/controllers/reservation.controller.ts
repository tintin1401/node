import { Request, Response } from 'express';
import {isTrainer} from './user.controller';
import {createNotification} from './notification.controller';
import { ReservationModel } from '../models/reservations.model';

// Obtener todas las reservas
export const getReservations = async (req: Request, res: Response): Promise<void> => {
    try {
        const trainerId = req.body;
        const reservations = await ReservationModel.find(trainerId);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

export const createReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const reservationData = req.body;
        const isTrainerUser = await isTrainer(reservationData.trainerId);
        if (!isTrainerUser) {
            res.status(400).json({ error: 'El usuario no es un entrenador' });
            return;
        }
        const availability = await isReservationAvailable(reservationData);
        if (!availability) {
            res.status(400).json({ error: 'La reserva ya está ocupada' });
            return;
        }
        const newReservation = new ReservationModel(reservationData);
        await newReservation.save();
        await createNotification({
            trainerId: reservationData.trainerId,
            userId: reservationData.userId,
            message: " ha reservado para el dia  " + reservationData.date + " a las " + reservationData.time,
        });

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
}

export const isReservationAvailable = async (reservationData: { date: string, time: string, trainerId: string }) => {
    try {
        const existingReservation = await ReservationModel.findOne(reservationData);
        if (existingReservation) {
           return false; 
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error checking reservation availability:', error);
    }
}