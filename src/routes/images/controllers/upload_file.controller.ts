import { Request, Response } from 'express';
import { filesQueue } from '../utils/queue.utils';
import { processFileQueue } from '../utils/file.utils';
import { nanoid } from 'nanoid';
import { setStatus } from '../utils/status.utils';

const uploadFileController = async (req: Request, res: Response) => {
  const fileId = nanoid();
  const status = { message: 'in queue' };

  setStatus(fileId, status);

  res.status(200).json({ file_id: fileId });

  const isFilesQueueEmpty = filesQueue.length === 0;

  filesQueue.push([req.file!, req.body.format_to, fileId]);

  if (isFilesQueueEmpty) {
    processFileQueue(filesQueue);
  }
};

export { uploadFileController };
