import express from 'express';
import { healthController } from './health.controller';
import { router as imagesRouter } from './images/router';
import { router as authRouter } from './auth/router';
import { CustomError } from '../utils';
import { injectSuccessStatus } from './images/middlewares/injectSuccessStatus.middleware';
import { errorHandlerMiddleware } from './errorHandler.middleware';

const router = express.Router();

router.use(injectSuccessStatus);

router.use('/health', healthController);
router.use('/images', imagesRouter);
router.use('/auth', authRouter);

router.use('*', () => {
  throw new CustomError("Route doesn't exist!");
});

router.use(errorHandlerMiddleware);

export { router };
