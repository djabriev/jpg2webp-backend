import { Request, Response } from 'express';
import { filesQueue } from '../utils/queue.utils';
import { processFileQueue } from '../utils/file.utils';

const uploadFileController = async (req: Request, res: Response) => {
  res.status(200).json({});

  const isFilesQueueEmpty = filesQueue.length === 0;

  filesQueue.push([req.file!, req.body.format_to]);

  if (isFilesQueueEmpty) {
    processFileQueue(filesQueue);
  }
};

export { uploadFileController };
