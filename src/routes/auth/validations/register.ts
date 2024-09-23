import Joi, { CustomHelpers } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { returnError } from '../../../utils';

const schema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }).required(),
})
  .unknown(true)
  .required();

const registerRequestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.validate(req);

  if (!result.error) {
    return next();
  }

  return res.status(400).json(returnError(result.error.message));
};

export { registerRequestValidation };
