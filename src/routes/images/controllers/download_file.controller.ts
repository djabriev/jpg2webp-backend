import { Request, Response } from 'express';
import { getStatus } from '../utils/status.utils';
import { CustomError } from '../../../utils';
import { join } from 'path';

const rootDirAt = join(__dirname, '..', '..', '..', '..');

const downloadFileController = async (req: Request, res: Response) => {
  const fileId = req.params.file_id;
  const status = getStatus(fileId);

  if (!status.fileName) {
    throw new CustomError('File is not ready!');
  }

  return res.sendFile(join(rootDirAt, 'to_download', status.fileName));
};

export { downloadFileController };
