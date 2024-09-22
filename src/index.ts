import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { router } from './routes/router.global';
import { isDotEnvValid } from './env.schema';
import { reportError } from './utils';

const main = () => {
  const morganMiddleware = morgan(process.env.MORGAN_CONF!);
  const appPort = parseInt(process.env.port!);
  const app = express();

  app.use(morganMiddleware);
  app.use(router);

  app.listen(appPort, () => {
    console.info('Server is running!');
  });
};

process.on('uncaughtException', err => {
  reportError(err);
});

if (isDotEnvValid()) {
  const downloadDir = join(__dirname, '..', 'to_download');

  if (!existsSync(downloadDir)) {
    mkdirSync(downloadDir);
  }

  main();
}
