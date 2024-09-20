import { Request, Response } from 'express';
import { getStatus } from '../utils/status.utils';

const fileStatusController = async (req: Request, res: Response) => {
  const fileId = req.params.file_id;
  const status = getStatus(fileId);

  return res.json({ file_status: status });
};

export { fileStatusController };
