import Joi, { CustomHelpers } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { returnError } from '../../../utils';

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

  return res.status(400).json(returnError(result.error.message));
};

export { refreshTokenRequestValidation };
