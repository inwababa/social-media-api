import { Request, Response } from 'express';
import  NotificationModel  from '../models/notificationSchema';
import  UserModel  from '../models/userSchema';
import { AuthenticatedRequest } from '../interface/customInterface';
import { storeDataInCache } from '../middleware/cacheMiddleware';


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

        // Store notifications data in caches
      storeDataInCache(userId, notifications);
  
      res.status(200).json({ success: true, message: 'Notification retreived successfully', data: notifications });
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
