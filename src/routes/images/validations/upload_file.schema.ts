import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { unlink } from 'node:fs/promises';
import { returnError } from '../../../utils';

const imageMimeTypes = process.env.FREE_UPLOAD_FILE_TYPES!.split(' ');
const convertToFormats = process.env.FREE_CONVERT_FILE_TYPES!.split(' ');
const premiumImageMimeTypes = process.env.UPLOAD_FILE_TYPES!.split(' ');
const premiumConvertToFormats = process.env.CONVERT_FILE_TYPES!.split(' ');
const fileSizeInBytes = parseInt(process.env.UPLOAD_FILE_LIMIT!);

const uploadFileValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mimeTypes = req.userId ? premiumImageMimeTypes : imageMimeTypes;
  const toFormats = req.userId ? premiumConvertToFormats : convertToFormats;

  const schema = Joi.object({
    file: Joi.object({
      fieldname: Joi.string().valid('photo').required(),
      mimetype: Joi.string()
        .required()
        .valid(...mimeTypes),
      size: Joi.number().greater(0).less(fileSizeInBytes).required(),
    })
      .unknown(true)
      .required(),
    body: Joi.object({
      format_to: Joi.string()
        .required()
        .valid(...toFormats),
    }).required(),
  })
    .unknown(true)
    .required();

  const result = schema.validate(req);

  if (!result.error) {
    return next();
  }

  if (req.file) {
    unlink(req.file.path);
  }

  return res.status(400).json(returnError(result.error.message));
};

export { uploadFileValidation };
