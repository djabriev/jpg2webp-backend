import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { CustomError } from '../../../utils';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return next();
  }

  try {
    const decoded = verify(
      token!,
      process.env.SUPABASE_PRIVATE_KEY!
    ) as JwtPayload;
    req.userId = decoded.sub;
  } catch {
    throw new CustomError('Invalid Authorization');
  }

  next();
};

export { checkAuth };
