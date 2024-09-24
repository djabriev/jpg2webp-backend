import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../utils';

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

  throw new CustomError(result.error.message);
};

export { registerRequestValidation };
