import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interface/customInterface';

import redis from 'ioredis';

const redisClient = new redis();




const cacheMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
const key = req.user.userId;
  // Check if data exists in cache
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error('Error retrieving data from cache:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (data) {
      // Data found in cache, return it
      console.log('Data retrieved from cache');
      return res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};

// Function to store data in cache
const storeDataInCache = (key: string, data: any) => {
  redisClient.setex(key, 3600, JSON.stringify(data)); // Cache for 1 hour (3600 seconds)
};

// Remove given Redis cache key
function removeCache(key: string) {
  try {
      redisClient.del(key);
  } catch (err) {
      return null;
  }
}

export { cacheMiddleware, storeDataInCache, removeCache };
