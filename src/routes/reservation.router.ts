import express from 'express';
import { createReservation } from '../controllers/reservation.controller';

const router = express.Router();

// Example Express route
router.post('/create', createReservation);


export default router;