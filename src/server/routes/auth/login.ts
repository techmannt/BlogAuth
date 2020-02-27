import { Router, Request } from 'express';
import * as passport from 'passport';
import { createToken } from '../../services/tokens';

const router = Router();

router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => {
	try {
		let userid = req.user.id;
		let role = req.user.role;
		let token = await createToken({ userid: req.user.id, role: req.user.role });
		res.json({ token, userid, role });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error, msg: 'There is a problem.' });
	}
});

interface ReqUser extends Request {
	user: {
		id: number;
		role: string;
	};
}

export default router;
