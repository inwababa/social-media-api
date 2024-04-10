// controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/userSchema';
import jwt from 'jsonwebtoken';
const secretKey = process.env.TOKEN_KEY!;
import { AuthenticatedRequest } from '../interface/customInterface';



export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: true, message: 'User with this email already exists', data: null });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await UserModel.create({ firstName: firstName, LastName: lastName, userName: userName, email: email, password: hashedPassword });

    return res.status(201).json({ success: true, message: 'User created successfully', data: null });
  } catch (error) {
    console.error('Error in user registration:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found', data: null });
    }
  
    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
  
    res.status(200).json({ success: true, message: 'Login successful', data: token });
  };


  export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
      // Retrieve the user ID from the authenticated request
      const userId = req.user.userId;
  
      const userProfile = await UserModel.findById(userId);
  
      if (!userProfile) {
        return res.status(404).json({ success: false, message: 'User profile not found' });
      }
      const { password, ...userWithoutPassword } = userProfile.toObject();
  
      return res.status(200).json({ success: true, message: 'User profile', data: userWithoutPassword });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
