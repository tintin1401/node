import express from 'express';
import { getTrainerNotifications } from '../controllers/notification.controller';

const router = express.Router();

// Example Express route
router.post('/notify', getTrainerNotifications);


export default router;