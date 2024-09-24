import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../utils';

const schema = Joi.object({
  body: Joi.object({
    refresh_token: Joi.string().required().min(20),
  }).required(),
})
  .unknown(true)
  .required();

const refreshTokenRequestValidation = (
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

export { refreshTokenRequestValidation };
