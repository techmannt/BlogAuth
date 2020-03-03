import { Router } from 'express';
import { tokenCheckpoint } from '../../middlewares/auth-checkpoints';
import testRouter from './test';
import blogRouter from './entries';
import tagsRouter from './tags';
import donateRouter from './donate';
const router = Router();

router.use(tokenCheckpoint);
router.use('/entries', blogRouter);
router.use('/tags', tagsRouter);
router.use('/donate', donateRouter);
router.use('/test', testRouter);

export default router;
