import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; 
}


