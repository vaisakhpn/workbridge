import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: IUser;
}

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token: string | undefined;

  // 1. Obtain token from authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'supersecretjwtkeychangeinproduction'
    ) as DecodedToken;

    // 3. Find user in database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User belonging to this token no longer exists' });
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('JWT auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};

export const restrictTo = (...roles: Array<'worker' | 'event_team' | 'admin'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction): any => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};
