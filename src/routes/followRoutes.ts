import express from 'express';
import authenticateToken from '../middleware/auth';
import { followUser } from '../controllers/followController';

const router = express.Router();

router.post('/follow', authenticateToken, followUser);

export default router;