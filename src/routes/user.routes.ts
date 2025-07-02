import slug from 'slug';
import { Router } from 'express';
import { body } from 'express-validator';

import { editUser } from '../types/user';
import filterBody from '../middlewares/filterBody';
import validateFields from '../middlewares/validateFields';
import { authenticate } from '../middlewares/authenticate';
import { userNameExists } from '../validators/user.validators';
import { getUser, updateUser, uploadImage } from '../controllers/user.controller';

const router = Router();

router.get('/', authenticate, getUser);

router.patch('/', [
  authenticate,
  body('username')
    .notEmpty().withMessage('Username is required').bail()
    .isString().withMessage('Username must be a string').bail()
    .trim().notEmpty().withMessage('Username can not be empty').bail()
    .customSanitizer(value => slug(value, ''))
    .custom(userNameExists),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string').bail()
    .trim(),
  filterBody(editUser),
  validateFields
], updateUser);

router.post('/image', authenticate, uploadImage);

export default router;