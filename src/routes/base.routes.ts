import { Router } from 'express';
import { getByUsername } from '../controllers/base.controller';

const router = Router();

router.get('/:username', getByUsername);

export default router;