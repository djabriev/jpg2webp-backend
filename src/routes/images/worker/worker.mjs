import 'dotenv/config';
import { parentPort } from 'worker_threads';
import { addToQueue, isEmpty } from './queue.utils.mjs';
import { processFileQueue } from './queue.utils.mjs';
import { delay } from './common.utils.mjs';

const delayMs = process.env.Q_LOOP_DELAY_MS;
const maxConcurrentImages = process.env.MAX_CONCURRENT_IMAGES;

parentPort.on('message', data => {
  if (data.type === 'add') {
    addToQueue(data.data);
  }
});

const setStatus = (fileId, status) => {
  setImmediate(() => {
    parentPort.postMessage({ fileId, status });
  });
};

const threadMain = async () => {
  while (true) {
    if (isEmpty()) {
      await delay(delayMs);
      continue;
    }

    await processFileQueue(maxConcurrentImages);
  }
};

threadMain();

export { setStatus };
