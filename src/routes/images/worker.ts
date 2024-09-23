import { join } from 'path';
import { Worker } from 'worker_threads';
import { setStatus } from './utils/status.utils';

const workers: Worker[] = [];

for (let i = 0; i < 2; i += 1) {
  workers.push(new Worker(join(__dirname, 'worker', 'worker.mjs')));
}

const addImageToQ = async (
  data: {
    fileName: string;
    fileId: string;
    formatTo: string;
  },
  worker = 0
) => {
  workers[worker].postMessage({
    data: data,
    type: 'add',
  });
};

for (const worker of workers) {
  worker.on(
    'message',
    (data: {
      fileId: string;
      status: { message: string; fileName: string };
    }) => {
      setStatus(data.fileId, data.status);
    }
  );

  worker.on('error', error => {
    throw error;
  });
}

export { addImageToQ };
