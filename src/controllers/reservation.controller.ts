import { Request, Response } from 'express';
import {isTrainer} from './user.controller';
import {createNotification} from './notification.controller';
import { ReservationModel } from '../models/reservations.model';



export const createReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const reservationData = req.body;
        const isTrainerUser = await isTrainer(reservationData.trainerId);
        if (!isTrainerUser) {
            res.status(400).json({ error: 'El usuario no es un entrenador' });
            return;
        }
        const availability = await isReservationAvailable({ 
            date: reservationData.date,
            time: reservationData.time,
            trainerId: reservationData.trainerId
        });

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

export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const reservationId = req.params.id;
        const deletedReservation = await ReservationModel.findByIdAndDelete(reservationId);
        if (!deletedReservation) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }
         await createNotification({
            trainerId: deletedReservation.trainerId.toString(),
            userId: deletedReservation.userId.toString(),
            message: " ha cancelado lareservado para el dia  " + deletedReservation.date + " a las " + deletedReservation.time,
        });

        res.json({ message: 'Reserva eliminada exitosamente' });
         

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
}

export const updateReservation = async (req: Request, res: Response): Promise<void> => {

    try{
         const { id } = req.body;       
        const reservationData = req.body;
        const isTrainerUser = await isTrainer(reservationData.trainerId);
        if (!isTrainerUser) {
            res.status(400).json({ error: 'El usuario no es un entrenador' });
            return;
        }
        const availability = await isReservationAvailable({
            date: reservationData.date,
            time: reservationData.time,
            trainerId: reservationData.trainerId
        });
        if (!availability) {
            res.status(400).json({ error: 'La reserva ya está ocupada' });
            return;
        }
        const updatedReservation = await ReservationModel.findByIdAndUpdate(id, reservationData, { new: true });
        if (!updatedReservation) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }
        await createNotification({
            trainerId: reservationData.trainerId,
            userId: reservationData.userId,
            message: " ha modificado la reservado para el dia  " + reservationData.date + " a las " + reservationData.time,
        });
        res.json(updatedReservation);

    }catch (error) {
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
}

export const getReservationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const reservationId = req.params.id;
        const reservation = await ReservationModel.findById(reservationId);
        if (!reservation) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
};

export const getReservationsByTrainer = async (req: Request, res: Response): Promise<void> => {
    try {
        const trainerId = req.params.trainerId;
        const reservations = await ReservationModel.find({ trainerId });
        if (reservations.length === 0) {
            res.status(404).json({ error: 'No se encontraron reservas para este entrenador' });
            return;
        }
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas del entrenador' });
    }
}

export const getReservationsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        const reservations = await ReservationModel.find({ userId });
        if (reservations.length === 0) {
            res.status(404).json({ error: 'No se encontraron reservas para este usuario' });
            return;
        }
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
    }
}

export const changeReservationStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, numberstatus } = req.body;
        let status:string = "";
        numberstatus == 2 ? status ="confirmed" : numberstatus == 3 ? status = "cancelled" : status = "pending";
        const updatedReservation = await ReservationModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedReservation) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }
        await createNotification({
            trainerId: updatedReservation.trainerId.toString(),
            userId: updatedReservation.userId.toString(),
            message: " ha cambiado el estado de la reserva a " + status + " para el dia  " + updatedReservation.date + " a las " + updatedReservation.time,
        });
        res.json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de la reserva' });
    }
}