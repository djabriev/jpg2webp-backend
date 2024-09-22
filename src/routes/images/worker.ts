import { join } from 'path';
import { Worker } from 'worker_threads';
import { setStatus } from './utils/status.utils';

const worker = new Worker(join(__dirname, 'worker', 'worker.mjs'));

const addImageToQ = async (data: {
  fileName: string;
  fileId: string;
  formatTo: string;
}) => {
  worker.postMessage({
    data: data,
    type: 'add',
  });
};

worker.on(
  'message',
  (data: { fileId: string; status: { message: string; fileName: string } }) => {
    setStatus(data.fileId, data.status);
  }
);

worker.on('error', msg => {
  console.error(msg);
});

export { addImageToQ };
