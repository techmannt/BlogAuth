import { Router } from 'express';
import blogRouter from './entries';
import tagsRouter from './tags';
import donateRouter from './donate';
import apiRouter from './api';
import authRouter from './auth';

const router = Router();
router.use('/entries', blogRouter);
router.use('/tags', tagsRouter);
router.use('/donate', donateRouter);
router.use('/api', apiRouter);
router.use('/auth', authRouter);

export default router;
