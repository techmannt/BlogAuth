import { Router } from 'express';
import { isGuest } from '../../middlewares/auth-checkpoints';

const router = Router();

router.get('/', isGuest, (req, res) => {
    res.json({ msg: 'PROTECTED INFO!!' });
});

export default router;