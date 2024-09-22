import Joi from 'joi';
import { reportError } from './utils';

const schema = Joi.object({
  PORT: Joi.number().positive().required(),
  Q_LOOP_DELAY_MS: Joi.number().positive().required(),
  NODE_ENV: Joi.valid('dev', 'prod').required(),
  MORGAN_CONF: Joi.valid(
    'combined',
    'common',
    'dev',
    'short',
    'tiny'
  ).required(),
  CONVERT_FILE_TYPES: Joi.string().required(),
  FREE_CONVERT_FILE_TYPES: Joi.string().required(),
  UPLOAD_FILE_TYPES: Joi.string().required(),
  UPLOAD_FILE_LIMIT: Joi.number().positive().required(),
  MAX_CONCURRENT_IMAGES: Joi.number().positive().required(),
}).unknown(true);

const isDotEnvValid = () => {
  const result = schema.validate(process.env);

  if (result.error) {
    reportError(result.error);
    return false;
  }

  return true;
};

export { isDotEnvValid };
