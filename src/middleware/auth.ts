import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
const secretKey = process.env.TOKEN_KEY!;
import { AuthenticatedRequest } from '../interface/customInterface';







const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    
        const user =  jwt.verify(token, secretKey);
    
        req.user = user;
    
        next();
      } catch (error) {
        // Handle any errors
        return res.status(403).json({ success: false, message: 'Token expired or invalid' });
      }
};

export default authenticateToken;

