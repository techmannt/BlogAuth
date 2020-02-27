import { Router } from 'express';
import { tokenCheckpoint } from '../../middlewares/auth-checkpoints';
import testRouter from './test';

const router = Router();

router.use(tokenCheckpoint);
router.use('/test', testRouter);

export default router;