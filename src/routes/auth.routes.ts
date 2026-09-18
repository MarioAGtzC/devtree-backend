import slug from 'slug';
import { Router } from 'express';
import { body } from 'express-validator';

import filterBody from '../middlewares/filterBody';
import { loginUser, registerUser } from '../types/user';
import validateFields from '../middlewares/validateFields';
import { createAccount, login } from '../controllers/auth.controller';
import { emailExists, userNameExists } from '../validators/user.validators';

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, name, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error
 */
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

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate and obtain a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: JWT bearer token
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: Invalid password
 *       404:
 *         description: Email not found
 */
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