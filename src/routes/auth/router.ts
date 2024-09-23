import express from 'express';
import bodyParser from 'body-parser';
import { registerController } from './controllers/register.controller';
import { loginController } from './controllers/login.controller';
import { refreshTokenController } from './controllers/refresh_token.controller';
import { loginRequestValidation } from './validations/login.schema';
import { registerRequestValidation } from './validations/register';
import { refreshTokenRequestValidation } from './validations/refresh';

const router = express.Router();

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.post('/register', registerRequestValidation, registerController);
router.post('/login', loginRequestValidation, loginController);
router.post('/refresh', refreshTokenRequestValidation, refreshTokenController);

export { router };
