import express from 'express';
import { getUsers, getTrainers, updateUser, login, register } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.put('/updateUser/:id', updateUser);

router.get('/getTrainers', getTrainers);
router.get('/getUsers', getUsers);



export default router;
