import { Router } from 'express';
import { body } from 'express-validator';
import validateFields from '../middlewares/validateFields';
import { userNameExists } from '../validators/user.validators';
import { getByUsername, searchByUsername } from '../controllers/base.controller';

const router = Router();

/**
 * @openapi
 * /{username}:
 *   get:
 *     tags: [Public]
 *     summary: Get a public profile by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Public profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublicUser'
 *       404:
 *         description: User not found
 */
router.get('/:username', getByUsername);

/**
 * @openapi
 * /search:
 *   post:
 *     tags: [Public]
 *     summary: Check whether a username is available
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username]
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username availability message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Username already taken / validation error
 */
router.post('/search', [
  body('username')
    .notEmpty().withMessage('Username is required').bail()
    .isString().withMessage('Username must be a string').bail()
    .trim().notEmpty().withMessage('Username can not be empty').bail()
    .custom(userNameExists),
  validateFields
], searchByUsername);

export default router;