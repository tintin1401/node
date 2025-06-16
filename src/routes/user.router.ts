import express from 'express';
import { getUsers, getTrainers, login, register } from '../controllers/user.controller';

const router = express.Router();

// Example Express route
router.post('/find', getUsers);
router.post('/register', register);

router.post('/login', login);
router.get('/getTrainers', getTrainers);


export default router;
