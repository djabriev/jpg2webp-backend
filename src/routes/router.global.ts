import express from 'express';
import { healthController } from './health.controller';
import { router as imagesRouter } from './images/router';
import { errorHandlerMiddleware, injectSuccessStatus } from './middlewares';

const router = express.Router();

router.use(injectSuccessStatus);

router.use('/health', healthController);
router.use('/images', imagesRouter);

router.use(errorHandlerMiddleware);

export { router };
