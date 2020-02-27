import { Router } from 'express';
import blogRouter from './entries';
import tagsRouter from './tags';
import donateRouter from './donate';

const router = Router();
router.use('/entries', blogRouter);
router.use('/tags', tagsRouter);
router.use('/donate', donateRouter);

export default router;
