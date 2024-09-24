import { Request, Response, NextFunction } from 'express';

const injectSuccessStatus = (
  _req: Request,
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

export { injectSuccessStatus };
