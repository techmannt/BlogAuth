import { Router } from 'express';
import { tokenCheckpoint, isGuest } from '../../middlewares/auth-checkpoints';

const router = Router();

// GET /auth/tokens/validate
router.get('/validate', tokenCheckpoint, isGuest, async (req, res) => {
    res.json({ msg: 'loggedIn' });
});

export default router;