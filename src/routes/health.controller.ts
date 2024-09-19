import { Request, Response } from 'express';

const healthController = async (req: Request, res: Response) => {
  res.json({});
};

export { healthController };
