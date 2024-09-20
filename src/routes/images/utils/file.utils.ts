import sharp from 'sharp';
import Denque from 'denque';
import { join } from 'node:path';
import { unlink } from 'node:fs/promises';
import { setStatus } from './status.utils';

const maxConcurrentImages = parseInt(process.env.MAX_CONCURRENT_IMAGES!);
const rootDirAt = join(__dirname, '..', '..', '..', '..');

const convertFilePromise = async (
  file: string,
  pathToSave: string,
  format_to: string
) => {
  const toFormat = format_to as keyof typeof sharp.format;

  try {
    await sharp(file).toFormat(toFormat).toFile(pathToSave);
  } catch (err) {
    throw Error('Error reading/converting file!');
  }

  return pathToSave;
};

const createConvertFilePromise = (queue: Denque) => {
  const [file, formatTo, fileId] = queue.shift() as [
    Express.Multer.File,
    string,
    string,
  ];

  const saveFrom = join(rootDirAt, 'uploads', file.filename);
  const saveTo = join(rootDirAt, 'to_download', `${file.filename}.${formatTo}`);

  setStatus(fileId, { message: 'processing' });

  return convertFilePromise(saveFrom, saveTo, formatTo)
    .then(async () => {
      setStatus(fileId, {
        message: 'ready',
        fileName: `${file.filename}.${formatTo}`,
      });

      await unlink(saveFrom);
    })
    .catch(() => {
      setStatus(fileId, { message: 'error' });
    });
};

const processFileQueue = async (queue: Denque) => {
  while (queue.length > 0) {
    const elementsToPop = Math.min(maxConcurrentImages, queue.length);

    const promises = [];

    for (let i = 0; i < elementsToPop; i++) {
      promises.push(createConvertFilePromise(queue));
    }

    await Promise.allSettled(promises);
  }
};

export { processFileQueue };
