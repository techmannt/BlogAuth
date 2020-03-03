import { Router, Request } from 'express';
import { createToken } from '../../services/tokens';
import db from '../../db';
import { generateHash } from '../../services/password';

const router = Router();

router.post('/', async (req: ReqUser, res) => {
    try {
        let hashedPass = generateHash(req.body.password);
        let role = 'guest';
        let result = await db.users.addUser(req.body.username, req.body.email, hashedPass);
        let userid = result.insertId;
        let token = await createToken({ userid, role });
        res.json({ token, userid, role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, msg: 'There is an error!' });
    }
});

interface ReqUser extends Request {
    user: {
        id: number;
        role: string;
        name: string;
        email: string;
        password: string;
    };
}

export default router;
