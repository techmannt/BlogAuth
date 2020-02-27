import { Router } from 'express';
import registerRouter from './register';
import loginRouter from './login';
import tokensRouter from './tokens';

const router = Router();

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/tokens', tokensRouter);

export default router;