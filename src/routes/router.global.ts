import express from 'express';
import { healthController } from './health.controller';
import { router as imagesRouter } from './images/router';
import { errorHandlerMiddleware, injectSuccessStatus } from './middlewares';
import { returnError } from '../utils';

const router = express.Router();

router.use(injectSuccessStatus);

router.use('/health', healthController);
router.use('/images', imagesRouter);

router.use('*', (_req, res) => {
  return res.status(400).json(returnError("Route doesn't exist!"));
});

router.use(errorHandlerMiddleware);

export { router };
