import express from 'express';
import { getUsers, register } from '../controllers/user.controller';

const router = express.Router();

// Example Express route
router.post('/find', getUsers);
router.post('/register', register);


export default router;
