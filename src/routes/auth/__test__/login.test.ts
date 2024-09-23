import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import { router } from '../../router.global';

const app = express();
app.use(router);

describe('loginController', () => {
  it('should return invalid login data error', async () => {
    const user = { email: 'test@email.com', password: 'fsdfsdfdsfsdf' };

    const response = await request(app).post('/auth/login').send(user);

    expect(response.body).toHaveProperty('error');
  });
});
