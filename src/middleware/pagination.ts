import { Request, Response, NextFunction } from 'express';

export const paginate = (req: Request, res: Response, next: NextFunction) => {
  // Get pagination parameters from request query or use default values
  const page = parseInt(req.query.page as string) || 1; 
  const limit = parseInt(req.query.limit as string) || 10;

  // Calculate skip value based on pagination parameters
  const skip = (page - 1) * limit;

  // Attach pagination metadata to response locals
  res.locals.pagination = {
    page: page,
    limit: limit,
    skip: skip
  };

  next();
};
