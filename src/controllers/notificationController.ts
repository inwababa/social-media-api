import { Request, Response } from 'express';
import  NotificationModel  from '../models/notificationSchema';
import  UserModel  from '../models/userSchema';
import { AuthenticatedRequest } from '../interface/customInterface';
import { storeDataInCache, removeCache } from '../middleware/cacheMiddleware';


export const createMentionNotification = async (postId: string, mentionedUserIds: string[]) => {
  // Create notifications for mentioned users
  const notifications = mentionedUserIds.map(userId => ({
    recipientId: userId,
    type: 'mention',
    postId: postId,
  }));

  await NotificationModel.insertMany(notifications);
};

export const createLikeNotification = async (postId: string, postOwnerId: string) => {
  // Create notification for post owner
  await NotificationModel.create({
    recipientId: postOwnerId,
    type: 'like',
    postId: postId,
  });

  // Invalidate/delete the cache for the recipient
   removeCache(postOwnerId);

  // Fetch the latest notifications and update the cache
  const notifications = await NotificationModel.find({ recipientId: postOwnerId }).sort({ createdAt: -1 });
   storeDataInCache(postOwnerId, notifications);
};

export const createCommentNotification = async (postId: string, postOwnerId: string,) => {
  // Create notification for post owner
  await NotificationModel.create({
    recipientId: postOwnerId,
    type: 'comment',
    postId: postId,
  });

  // Create notifications for mentioned users
  //await createMentionNotification(postId, mentionedUserIds);
};



export const getNotifications = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user.userId;
  
      const notifications = await NotificationModel.find({ recipientId: userId })
        .sort({ createdAt: -1 });
        if(notifications.length === 0) {
          res.status(200).json({ success: false, message: 'No Available Notification', data: [] });
        } else {
          // Store notifications data in caches
      storeDataInCache(userId, notifications);
  
      res.status(200).json({ success: true, message: 'Notification retreived successfully', data: notifications });
        }

        
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
