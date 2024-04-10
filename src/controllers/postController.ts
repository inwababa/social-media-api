import { Request, Response } from 'express';
import PostModel, { Post } from '../models/postSchema';
import { AuthenticatedRequest } from '../interface/customInterface';
import  FollowModel from '../models/followSchema';
import LikeModel from '../models/likeSchema';
import CommentModel from '../models/commentSchema';
import { createCommentNotification, createLikeNotification } from './notificationController';
import { io } from '../app';
import { storeDataInCache } from '../middleware/cacheMiddleware';

export const createPost = async (req: AuthenticatedRequest, res: Response) => {

  try {
    const userId = req.user.userId;

    const { text } = req.body;
   
    // Initialize variables to store file paths
    let attachmentPath: string | undefined = '';

    // Check if file attachment is provided
    if (req.file && req.file.fieldname === 'attachment') {

      // Set videoPath to the saved file path
      attachmentPath = req.file.path;
    }
    
    // Save post data in database
    const newPost: Post = await PostModel.create({ user: userId, text: text, attachment: attachmentPath });

    res.status(201).json({ success: true, message: 'Post created successfully', data: newPost });
  } catch (error) {
    console.error('Error creating post:', error);

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



export const getPersonalizedFeed = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Get the ID of the current user
    const userId = req.user.userId;

    // Find the list of user IDs that the current user is following
    const followings = await FollowModel.find({ followerId: userId }).select('followeeId');
    const followingIds = followings.map(follow => follow.followeeId);

    if (!followingIds || followingIds.length === 0) {
      
      return res.status(200).json({ success: true, message: 'Personalized feed is empty', data: [] });
    }

    // Find posts from followed users
    const posts = await PostModel.find({ user: { $in: followingIds } }).sort({ createdAt: -1 });

    // Store notifications data in caches
    storeDataInCache(userId, posts);

    res.status(200).json({ success: true, message: 'Personalized feed retrieved successfully', data: posts });
  } catch (error) {
    console.error('Error retrieving personalized feed:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



export const likePost = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const postId = req.params.postId;
      const userId = req.user.userId;

      const post = await PostModel.findById(postId);
      const posterId = post?.user
      const postOwnerId = posterId!.toString()
  
      // Check if the user has already liked the post
      const existingLike = await LikeModel.findOne({ postId, userId });
  
      if (existingLike) {
        // User has already liked the post, remove the like
        await LikeModel.findByIdAndDelete(existingLike._id);
        return res.status(200).json({ success: true, message: 'Post unliked successfully' });
      }
  
      // User has not liked the post, add a new like
      const newLike = await LikeModel.create({ postId: postId, userId: userId });

      await createLikeNotification(postId, postOwnerId);

      // Emit event to the owner of the post
    io.to(postOwnerId).emit('notification', { type: 'like', postId });

      res.status(201).json({ success: true, message: 'Post liked successfully', data: newLike });
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
 
  export const addComment = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const postId = req.params.postId;
      const userId = req.user.userId;
      const { text } = req.body;

      const post = await PostModel.findById(postId);
      const posterId = post?.user
      const postOwnerId = posterId!.toString()
  
      const newComment = await CommentModel.create({ postId: postId, userId: userId, text: text });

      await createCommentNotification(postId, postOwnerId);

      // Emit event to the owner of the post
    io.to(postOwnerId).emit('notification', { type: 'comment', postId });

      res.status(201).json({ success: true, message: 'Comment added successfully', data: newComment });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  export const deleteComment = async (req: Request, res: Response) => {
    try {
      const commentId = req.params.commentId;
  
      const deletedComment = await CommentModel.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
      }
  
      res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


  export const getPostDetails = async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
  
      // Get post details
      const post = await PostModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      // Count number of likes for the post
      const likeCount = await LikeModel.countDocuments({ postId });
  
      // Count number of comments for the post
      const commentCount = await CommentModel.countDocuments({ postId });
  
      res.status(200).json({
        success: true,
        message: 'Post details retrieved successfully',
        post: {
          _id: post._id,
          text: post.text,
          attachment: post.attachment,
          createdAt: post.createdAt,
          likeCount: likeCount,
          commentCount: commentCount
        }
      });
    } catch (error) {
      console.error('Error retrieving post details:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
