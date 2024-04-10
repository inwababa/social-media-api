import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUserRegistration = [
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('lastName').notEmpty().withMessage('Last Name is required'),  
  body('userName').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


export const validateUserLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];


  export const validatePost = [
    body('text').trim().notEmpty().withMessage('Post text is required'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
