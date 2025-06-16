import { Request, Response } from "express";
import {NotificationModel} from "../models/notifications.model";

export const getTrainerNotifications = async (req: Request, res: Response) => {
  try {
    // Use req.params.trainerId or req.user.id depending on your authentication
    const trainerId = req.params.trainerId || req.body.trainerId;
    interface PopulatedUser {
      _id: string;
      fullName: string;
    }
    interface PopulatedNotification {
      userId: PopulatedUser;
      message: string;
    }

    const notifications = await NotificationModel.find({ trainerId })
      .populate('userId', 'fullName')
      .sort({ createdAt: -1 }) as unknown as PopulatedNotification[];
    console.log('Notifications:', notifications);
    const messagesNotification: string[] = [];
    for (const notification of notifications) {
        messagesNotification.push(notification.userId.fullName + notification.message);
    }
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
