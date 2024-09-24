import { Request, Response, NextFunction } from 'express';
import {
  initIfNotExists,
  insertRecord,
  peekFirst,
  popLeft,
  uploadsCount,
} from '../utils/visitors.utils';
import { CustomError } from '../../../utils';

const daysToMilliseconds = 24 * 60 * 1000;

const freeUploadLimit = parseInt(process.env.FREE_UPLOAD_LIMIT!);
const freeUploadLimitPeriod =
  parseInt(process.env.FREE_UPLOAD_LIMIT_PERIOD_DAYS!) * daysToMilliseconds;

const premiumUploadLimit = parseInt(process.env.UPLOAD_LIMIT!);
const premiumUploadLimitPeriod =
  parseInt(process.env.UPLOAD_LIMIT_PERIOD_DAYS!) * daysToMilliseconds;

const fileUploadLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip as string;
  initIfNotExists(ip);

  const uploadLimit =
    req.userId === undefined ? freeUploadLimit : premiumUploadLimit;
  const uploadLimitMs =
    req.userId === undefined ? freeUploadLimitPeriod : premiumUploadLimitPeriod;
  const curTimestamp = Date.now();

  if (uploadsCount(ip) >= uploadLimit) {
    const firstRecord = peekFirst(ip) as number;

    if (curTimestamp - firstRecord > uploadLimitMs) {
      popLeft(ip);
    } else {
      throw new CustomError('File upload limit exceeded!');
    }
  }

  insertRecord(ip, curTimestamp);
  next();
};

export { fileUploadLimiter };
