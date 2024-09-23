import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import { join } from 'path';
import { router } from '../../router.global';

const supportedFormats = process.env.FREE_CONVERT_FILE_TYPES!.split(' ');

const app = express();
app.use(router);

let fileId = '';

beforeAll(async () => {
  const response = await request(app)
    .post('/images/upload')
    .attach('photo', join(__dirname, 'images', 'lloyd.jpg'))
    .field('format_to', supportedFormats[0]);

  expect(response.body).toHaveProperty('file_id');
  fileId = response.body.file_id;
});

describe('fileStatusController', () => {
  it('should return status by file_id', async () => {
    const response = await request(app).get(`/images/${fileId}/status`);

    expect(response.body).toHaveProperty('file_status');
  });

  it('should handle incorrect file_id', async () => {
    const response = await request(app).get('/images/incorrect_id/status');

    expect(response.body).toHaveProperty('error');
  });
});
