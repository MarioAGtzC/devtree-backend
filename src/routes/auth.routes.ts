import slug from 'slug';
import { Router } from 'express';
import { body } from 'express-validator';

import filterBody from '../middlewares/filterBody';
import { loginUser, registerUser } from '../types/user';
import validateFields from '../middlewares/validateFields';
import { createAccount, login } from '../controllers/auth.controller';
import { emailExists, userNameExists } from '../validators/user.validators';

const router = Router();

router.post('/register', [
  body('username')
    .exists({ values: 'falsy' }).withMessage('Username is required').bail()
    .isString().withMessage('Username must be a string').bail()
    .customSanitizer(value => slug(value, ''))
    .custom(userNameExists),
  body('name')
    .exists({ values: 'falsy' }).withMessage('Name is required').bail()
    .isString().withMessage('Name must be a string'),
  body('email')
    .isEmail().withMessage('Not a valid email')
    .custom(emailExists),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character'),
  filterBody(registerUser),
  validateFields
], createAccount);

router.post('/login', [
  body('email')
    .isEmail().withMessage('Not a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  filterBody(loginUser),
  validateFields
], login);

export default router;