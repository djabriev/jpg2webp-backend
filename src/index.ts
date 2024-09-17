import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { nanoid } from 'nanoid';
import { getCommandLineOptions } from './cli';
import { convertFile, getFiles } from './file.utils';

const main = async () => {
  const { args, opts } = getCommandLineOptions();
  const inputDir = args[0];
  const outputDir = opts['output'];

  if (!existsSync(inputDir)) {
    console.error("Input directory doesn't exist!");
    return;
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const timestamp = Date.now();
  const files = await getFiles(inputDir);

  for (const [fileIndex, file] of files.entries()) {
    const pathToSave = join(
      outputDir,
      `${nanoid()}_${timestamp}_${fileIndex + 1}.webp`
    );

    await convertFile(file, pathToSave);

    console.info(file, 'converted!');
  }
};

process.on('uncaughtException', err => {
  console.error(`Caught exception: ${err}`);
});

main();
