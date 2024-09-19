import { join } from 'node:path';
import { unlink } from 'node:fs/promises';
import sharp from 'sharp';
import Denque from 'denque';
import { filesQueue } from './queue.utils';

const maxConcurrentImages = parseInt(process.env.MAX_CONCURRENT_IMAGES!);
const rootDirAt = join(__dirname, '..', '..', '..', '..');

const convertFile = async (
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
};

const processFileQueue = async (queue: Denque) => {
  let elementsToPop = maxConcurrentImages;

  if (filesQueue.length < elementsToPop) {
    elementsToPop = filesQueue.length;
  }

  const promises = [];

  for (let i = 0; i < elementsToPop; i++) {
    const [file, formatTo] = queue.shift() as [Express.Multer.File, string];

    const saveFrom = join(rootDirAt, 'uploads', file.filename);
    const saveTo = join(
      rootDirAt,
      'to_download',
      `${file.filename}.${formatTo}`
    );

    const convertAndDeletePromise = convertFile(
      saveFrom,
      saveTo,
      formatTo
    ).then(async () => {
      await unlink(saveFrom);
    });

    promises.push(convertAndDeletePromise);
  }

  await Promise.allSettled(promises);

  if (queue.length > 0) {
    await processFileQueue(queue);
  }
};

export { convertFile, processFileQueue };
