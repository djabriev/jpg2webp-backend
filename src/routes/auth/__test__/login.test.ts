import 'dotenv/config';
import express, { Request, Response } from 'express';
import { router } from '../../router.global';
import { loginController } from '../controllers/login.controller';

const app = express();
app.use(router);

describe('loginController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn(),
      json: jest.fn(),
    };
  });

  it('should return invalid login data error', async () => {
    req = {
      header: jest.fn(),
      body: { email: 'test@email.com', password: 'fsdfsdfdsfsdf' },
    };

    const loginAttempt = async () => {
      await loginController(req as Request, res as Response);
    };

    await expect(loginAttempt).rejects.toThrow('Invalid login credentials');
  });
});
