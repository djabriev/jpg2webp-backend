import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import { join } from 'path';
import { router } from '../../router.global';

const app = express();
app.use(router);

const supportedFormats = process.env.FREE_CONVERT_FILE_TYPES!.split(' ');

describe('uploadFileController', () => {
  let fileId = '';

  it('should upload a file', async () => {
    const response = await request(app)
      .post('/images/upload')
      .attach('photo', join(__dirname, 'images', 'lloyd.jpg'))
      .field('format_to', supportedFormats[0]);

    expect(response.body).toHaveProperty('file_id');
    fileId = response.body.file_id;
  });

  it('should handle missing file', async () => {
    const response = await request(app)
      .post('/images/upload')
      .field('format_to', 'webp');

    expect(response.body).toHaveProperty('error');
  });

  it('should handle unknown convert format', async () => {
    const response = await request(app)
      .post('/images/upload')
      .attach('photo', join(__dirname, 'images', 'lloyd.jpg'))
      .field('format_to', 'whatever');

    expect(response.body).toHaveProperty('error');
  });

  /**
   * Some bug with error handler middleware + multer.
   * This test passes in hand mode.
   * But when run here, server responds with "read ECONNRESET" error.
   * Help me fix this plz 😭.
   */
  // it('should handle incorrect file key in request body', async () => {
  //   const response = await request(app)
  //     .post('/images/upload')
  //     .attach('IMAGEphoto', join(__dirname, 'images', 'lloyd.jpg'))
  //     .field('format_to', supportedFormats[0]);

  //     expect(response.status).toEqual(400);
  // });
});
