import { Dirent, readdir } from 'node:fs';
import { extname, join } from 'node:path';
import { promisify } from 'node:util';
import * as sharp from 'sharp';

const getFiles = async (dir: string, extensions = ['.jpg', '.png']) => {
  const readdirAsync = promisify(readdir);

  let filesInPath: Dirent[];

  try {
    filesInPath = await readdirAsync(dir, {
      withFileTypes: true,
      recursive: true,
    });
  } catch (err) {
    throw new Error(`Reading directory failed! Stack: ${err}`);
  }

  const files = [];

  for (const dirent of filesInPath) {
    if (!dirent.isFile()) {
      continue;
    }

    const extension = extname(dirent.name);

    if (!extensions.includes(extension)) {
      continue;
    }

    const fullFilePath = join(dirent.path, dirent.name);
    files.push(fullFilePath);
  }

  return files;
};

const convertFile = async (file: string, pathToSave: string) => {
  try {
    await sharp(file).webp().toFile(pathToSave);
  } catch (err) {
    throw new Error(`Error reading/converting file! Stack: ${err}`);
  }
};

export { getFiles, convertFile };
