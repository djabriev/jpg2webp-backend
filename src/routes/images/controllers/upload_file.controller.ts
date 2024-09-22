import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { setStatus } from '../utils/status.utils';
import { addImageToQ } from '../worker';

const uploadFileController = async (req: Request, res: Response) => {
  const fileId = nanoid();
  const status = { message: 'in queue' };

  setStatus(fileId, status);

  res.status(200).json({ file_id: fileId });

  const data = {
    fileName: req.file!.filename,
    fileId: fileId,
    formatTo: req.body.format_to,
  };

  await addImageToQ(data);
};

export { uploadFileController };
