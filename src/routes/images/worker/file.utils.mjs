import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';
import { unlink, readFile } from 'node:fs/promises';
import { setStatus } from './worker.mjs';

const rootDirAt = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  '..',
  '..'
);

const convertFilePromise = async (file, pathToSave, format_to) => {
  const toFormat = format_to;

  try {
    const data = await readFile(file);

    await sharp(data).toFormat(toFormat).toFile(pathToSave);
  } catch {
    throw Error('Error reading/converting file!');
  }

  return pathToSave;
};

const createConvertFilePromise = queue => {
  const { fileName, formatTo, fileId } = queue.shift();

  const saveFrom = join(rootDirAt, 'uploads', fileName);
  const saveTo = join(rootDirAt, 'to_download', `${fileName}.${formatTo}`);

  setStatus(fileId, { message: 'processing' });

  return convertFilePromise(saveFrom, saveTo, formatTo)
    .then(async () => {
      setStatus(fileId, {
        message: 'ready',
        fileName: `${fileName}.${formatTo}`,
      });
      
      await unlink(saveFrom);
    })
    .catch(() => {
      setStatus(fileId, { message: 'error' });
    });
};

export { createConvertFilePromise };
