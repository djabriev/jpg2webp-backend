import Joi, { CustomHelpers } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../utils';
import { checkStatusExistance } from '../utils/status.utils';

const validateFileIdExists = (value: string, helpers: CustomHelpers) => {
  if (!checkStatusExistance(value)) {
    return helpers.error('fileId.invalid', {
      message: `The file_id "${value}" doesn't exist.`,
    });
  }

  return value;
};

const schema = Joi.object({
  params: Joi.object({
    file_id: Joi.string().required().length(21).custom(validateFileIdExists),
  }).required(),
})
  .unknown(true)
  .required()
  .messages({
    'fileId.invalid': '{{#message}}',
  });

const downloadFileRequestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.validate(req);

  if (!result.error) {
    return next();
  }

  throw new CustomError(result.error.message);
};

export { downloadFileRequestValidation };
