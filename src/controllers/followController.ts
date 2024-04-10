import { Request, Response } from 'express';
import FollowModel from '../models/followSchema';
import { AuthenticatedRequest } from '../interface/customInterface';



export const followUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const followerId = req.user.userId; // Get the ID of the logged-in user
      const { followeeId } = req.body; // Get the ID of the user to follow
  
      // Check if the user is trying to follow themselves
      if (followerId === followeeId) {
        return res.status(400).json({ success: false, message: 'You cannot follow yourself' });
      }
  
      // Check if the user is already following the followee
      const existingRelationship = await FollowModel.findOne({ followerId, followeeId });
      if (existingRelationship) {
        return res.status(400).json({ success: false, message: 'You are already following this user' });
      }
  
      const newRelationship = await FollowModel.create({ followerId: followerId, followeeId: followeeId });
  
      res.status(201).json({ success: true, message: 'User followed successfully', data: newRelationship });
    } catch (error) {
      console.error('Error following user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  