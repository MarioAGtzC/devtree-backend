import { Router } from 'express';

import { getUser } from '../controllers/user.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/', authenticate, getUser);

export default router;