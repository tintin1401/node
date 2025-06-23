import express from 'express';
import { createReservation,updateReservation,deleteReservation,getReservationById,getReservationsByTrainer,getReservationsByUser ,changeReservationStatus} from '../controllers/reservation.controller';

const router = express.Router();

// Post routes
router.post('/create', createReservation);
router.post('/status', changeReservationStatus);


// Delete routes
router.delete('/delete/:id', deleteReservation);

// Put routes
router.put('/update',updateReservation);

// Get routes
router.get('/:id', getReservationById);
router.get('/trainer/:trainerId', getReservationsByTrainer);
router.get('/user/:userId', getReservationsByUser);


export default router;