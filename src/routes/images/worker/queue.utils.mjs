import { createConvertFilePromise } from './file.utils.mjs';
import Denque from "denque";

const filesQueue = new Denque();

const processFileQueue = async (maxConcurrentImages) => {
  const elementsToPop = Math.min(maxConcurrentImages, filesQueue.length);
  const promises = [];

  for (let i = 0; i < elementsToPop; i++) {
    promises.push(createConvertFilePromise(filesQueue));
  }

  await Promise.allSettled(promises);
};

const isEmpty = () => filesQueue.length === 0;

const addToQueue = (elem) => {
  filesQueue.push(elem);
}

export { processFileQueue, addToQueue, isEmpty };
