import Joi from 'joi';
import { reportError } from './utils';

const schema = Joi.object({
  PORT: Joi.number().positive().required(),
  MORGAN_CONF: Joi.valid(
    'combined',
    'common',
    'dev',
    'short',
    'tiny'
  ).required(),
  CONVERT_FILE_TYPES: Joi.string().required(),
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
