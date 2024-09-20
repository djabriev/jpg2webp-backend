import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { join } from 'node:path';
import { unlink } from 'node:fs/promises';
import { returnError } from '../../../utils';

const imageMimeTypes = process.env.UPLOAD_FILE_TYPES!.split(' ');
const convertToFormats = process.env.CONVERT_FILE_TYPES!.split(' ');
const fileSizeInBytes = parseInt(process.env.UPLOAD_FILE_LIMIT!);
const rootDir = join(__dirname, '..', '..', '..', '..');

const schema = Joi.object({
  file: Joi.object({
    fieldname: Joi.string().valid('photo').required(),
    mimetype: Joi.string()
      .valid(...imageMimeTypes)
      .required(),
    size: Joi.number().greater(0).less(fileSizeInBytes).required(),
  })
    .unknown(true)
    .required(),
  body: Joi.object({
    format_to: Joi.string()
      .valid(...convertToFormats)
      .required(),
  }).required(),
})
  .unknown(true)
  .required();

const uploadFileValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.validate(req);

  if (!result.error) {
    return next();
  }

  if (req.file) {
    unlink(join(rootDir, req.file.path));
  }

  return res.status(400).json(returnError(result.error.message));
};

export { uploadFileValidation };
