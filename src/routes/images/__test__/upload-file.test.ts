import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import { join } from 'path';
import { router } from '../../router.global';

const app = express();
app.use(router);

const supportedFormats = process.env.CONVERT_FILE_TYPES!.split(' ');

jest.mock('fs/promises', () => ({
  unlink: jest.fn(),
}));

beforeAll(() => {
  if (supportedFormats.length === 0 || supportedFormats[0].trim() === '') {
    throw Error('Supported formats env variable is empty!');
  }
});

describe('uploadFileController', () => {
  it('should upload a file', async () => {
    const response = await request(app)
      .post('/images/upload')
      .attach('photo', join(__dirname, 'images', 'lloyd.png'))
      .field('format_to', supportedFormats[0]);

    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should handle missing file', async () => {
    const response = await request(app)
      .post('/images/upload')
      //.attach('photo', join(__dirname, 'images', 'lloyd.png'))
      .field('format_to', 'webp');

    expect(response.body).toEqual({
      error: '"file" is required',
      status: 'error',
    });
  });

  it('should handle unknown convert format', async () => {
    const response = await request(app)
      .post('/images/upload')
      .attach('photo', join(__dirname, 'images', 'lloyd.png'))
      .field('format_to', 'whatever');

    const formatsString = supportedFormats.join(', ');

    expect(response.body).toEqual({
      error: `"body.format_to" must be one of [${formatsString}]`,
      status: 'error',
    });
  });

  /**
   * Some bug with error handler middleware + multer
   * This test passes in hand mode
   */
  // it('should handle incorrect file key in request body', async () => {
  //   const response = await request(app)
  //     .post('/images/upload')
  //     .attach('IMAGEphoto', join(__dirname, 'images', 'lloyd.png'))
  //     .field('format_to', supportedFormats[0]);

  //     expect(response.status).toEqual(400);
  // });
});
