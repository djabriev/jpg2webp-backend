import express from 'express';
import multer from 'multer';
import { uploadFileController } from './controllers/upload-file.controller';
import { uploadFileValidation } from './validations/upload-file.schema';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post(
  '/upload',
  upload.single('photo'),
  uploadFileValidation,
  uploadFileController
);

export { router };
