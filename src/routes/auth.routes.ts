import slug from 'slug';
import { Router } from 'express';
import { body } from 'express-validator';

import User from '../models/user.model';
import filterBody from '../middlewares/filterBody';
import validateFields from '../middlewares/validateFields';
import { createAccount } from '../controllers/auth.controller';
import { emailExists, userNameExists } from '../validators/user.validators';

const router = Router();

router.post('/register', [
  body('username')
    .exists({ values: 'falsy' }).withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .customSanitizer(value => slug(value, ''))
    .custom(userNameExists),
  body('name')
    .exists({ values: 'falsy' }).withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('email')
    .isEmail()
    .custom(emailExists),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.'),
  filterBody(User.schema),
  validateFields
], createAccount);

export default router;