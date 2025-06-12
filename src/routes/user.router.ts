import express from 'express';
import { getUsers } from '../controllers/user.controller';

const router = express.Router();

// Example Express route
router.get('/fullname/:fullName', getUsers);


export default router;
