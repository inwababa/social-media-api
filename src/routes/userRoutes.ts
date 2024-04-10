import express from 'express';
import { validateUserRegistration, validateUserLogin } from '../middleware/validation';
import { loginUser, registerUser, getUserProfile } from '../controllers/userController';
import authenticateToken from '../middleware/auth';

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);
router.get('/profile', authenticateToken,  getUserProfile);

export default router;
