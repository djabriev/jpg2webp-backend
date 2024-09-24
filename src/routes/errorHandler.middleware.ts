import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import { CustomError, JoiError, reportError, returnError } from '../utils';

const errorHandlerMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (
    error instanceof JoiError ||
    error instanceof MulterError ||
    error instanceof CustomError
  ) {
    res.status(400).send(returnError(error.message));
    reportError(error, true);
  } else {
    res.status(500).send(returnError('Something went wrong.'));
    reportError(error);
  }
};

export { errorHandlerMiddleware };
