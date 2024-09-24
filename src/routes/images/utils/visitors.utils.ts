import Denque from 'denque';

const visitorRecord: Record<string, Denque<number>> = {};

const initIfNotExists = (ip: string) => {
  if (!(ip in visitorRecord)) {
    visitorRecord[ip] = new Denque([]);
  }
};

const insertRecord = (ip: string, timestamp: number) => {
  visitorRecord[ip].push(timestamp);
};

const uploadsCount = (ip: string) => {
  return visitorRecord[ip].length;
};

const peekFirst = (ip: string) => {
  return visitorRecord[ip].peekFront();
};

const popLeft = (ip: string) => {
  return visitorRecord[ip].shift();
};

export { initIfNotExists, insertRecord, uploadsCount, peekFirst, popLeft };
