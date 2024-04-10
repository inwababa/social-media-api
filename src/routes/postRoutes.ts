import express from 'express';
import { validatePost } from '../middleware/validation';
import authenticateToken from '../middleware/auth';
import { addComment, createPost, deleteComment, getPersonalizedFeed, getPostDetails, likePost } from '../controllers/postController';
import { upload } from '../middleware/upload';
import { paginate } from '../middleware/pagination';
import { getNotifications } from '../controllers/notificationController';
import { cacheMiddleware } from '../middleware/cacheMiddleware';

const router = express.Router();

//router.post('/create', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), validatePost, createPost);
router.post('/create', authenticateToken, upload.single( 'attachment'), validatePost, createPost);
router.get('/postfeeds', authenticateToken, cacheMiddleware, paginate, getPersonalizedFeed);
router.post('/likepost/:postId', authenticateToken, likePost);
router.post('/addcomment/:postId', authenticateToken, addComment);
router.delete('/deletecomment/:commentId', authenticateToken, deleteComment);
router.get('/postdetails/:postId', authenticateToken, getPostDetails);
router.get('/notifications', authenticateToken, cacheMiddleware, getNotifications);

export default router;