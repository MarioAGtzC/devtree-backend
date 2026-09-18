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

/**
 * @openapi
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Get the authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The authenticated user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Missing or invalid Authorization header
 *       404:
 *         description: User not found
 */
router.get('/', authenticate, getUser);

/**
 * @openapi
 * /user:
 *   patch:
 *     tags: [User]
 *     summary: Update the authenticated user's profile
 *     security:
 *       - bearerAuth: []
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account updated
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing or invalid Authorization header
 */
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

/**
 * @openapi
 * /user/image:
 *   post:
 *     tags: [User]
 *     summary: Upload/replace the authenticated user's profile image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *       401:
 *         description: Missing or invalid Authorization header
 *       500:
 *         description: No file uploaded or upload error
 */
router.post('/image', authenticate, uploadImage);

export default router;