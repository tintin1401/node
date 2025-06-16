import { Request, Response } from "express";
import {NotificationModel} from "../models/notifications.model";
import {PopulatedUser} from "../models/types/notification.types";

export const getTrainerNotifications = async (req: Request, res: Response) => {
  try {
    // Use req.params.trainerId or req.user.id depending on your authentication
    const trainerId = req.params.trainerId || req.body.trainerId;
    
    
   const notifications = await NotificationModel.find({ trainerId })
      .populate<{ userId: PopulatedUser }>('userId', 'fullName')
      .sort({ createdAt: -1 });

    const messagesNotification = notifications.map(
      (n) => `${n.userId.fullName}: ${n.message}`
    );

    res.status(200).json({ messagesNotification });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo notificaciones' });
  }
};

export const createNotification = async(notificationData: {trainerId: string, userId: string, message: string}) => {

    try {
        const newNotification = new NotificationModel(notificationData);
        await newNotification.save();
        return newNotification;
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}
