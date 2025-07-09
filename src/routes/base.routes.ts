import { Router } from 'express';
import { body } from 'express-validator';
import validateFields from '../middlewares/validateFields';
import { userNameExists } from '../validators/user.validators';
import { getByUsername, searchByUsername } from '../controllers/base.controller';

const router = Router();

router.get('/:username', getByUsername);
router.post('/search', [
  body('username')
    .notEmpty().withMessage('Username is required').bail()
    .isString().withMessage('Username must be a string').bail()
    .trim().notEmpty().withMessage('Username can not be empty').bail()
    .custom(userNameExists),
  validateFields
], searchByUsername);

export default router;