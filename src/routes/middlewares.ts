import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import { JoiError, reportError, returnError } from '../utils';

const injectSuccessStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json.bind(res);

  res.json = data => {
    const hasError = res.statusCode >= 400 || (data && data.error);

    if (!hasError && typeof data === 'object' && data !== null) {
      data.status = 'ok';
    }

    return originalJson(data);
  };

  next();
};

const errorHandlerMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof JoiError || error instanceof MulterError) {
    res.status(400).send(returnError(error.message));
  } else {
    res.status(500).send(returnError('Something went wrong.'));
  }

  reportError(error);
};

export { injectSuccessStatus, errorHandlerMiddleware };
