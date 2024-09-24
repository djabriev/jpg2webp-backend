import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { router } from '../../router.global';
import { checkAuth } from '../middlewares/checkAuth.middleware';
import { errorHandlerMiddleware } from '../../errorHandler.middleware';

const app = express();
app.use(router);

describe('checkAuth middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      header: jest.fn().mockReturnValue('Bearer'),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return invalid Authorization error', () => {
    expect(() => checkAuth(req as Request, res as Response, next)).toThrow(
      'Invalid Authorization'
    );
  });
});
