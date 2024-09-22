import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import { join } from 'path';
import { router } from '../../router.global';

const app = express();
app.use(router);

const supportedFormats = process.env.CONVERT_FILE_TYPES!.split(' ');
let fileId = '';

beforeAll(async () => {
  const response = await request(app)
    .post('/images/upload')
    .attach('photo', join(__dirname, 'images', 'lloyd.png'))
    .field('format_to', supportedFormats[0]);

  expect(response.body).toHaveProperty('file_id');
  fileId = response.body.file_id;

  await new Promise(resolve => setTimeout(resolve, 3000));
});

describe('downloadFileController', () => {
  it('should download a file', async () => {
    const response = await request(app).get(`/images/${fileId}`);

    expect(response.body).toBeInstanceOf(Buffer);
  });
});
