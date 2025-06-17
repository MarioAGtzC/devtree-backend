import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import User, { IUser } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export const authenticate = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
  const auth = req.headers.authorization;

  if(!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Unauthorized'})
  }

  const [, token] = auth.split(' ');

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if(typeof result === 'object' && result.id) {
      const user = await User.findById(result.id).select('-password');
      if(!user) {
        return res.status(404).json({error: 'User doesn\'t exist'})
      }
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}