import express from 'express';
import { getUsers } from '../controllers/user.controller';

const router = express.Router();

// Example Express route
router.post('/find', getUsers);


export default router;
