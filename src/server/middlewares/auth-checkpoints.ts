import * as passport from 'passport';
import { RequestHandler, Request } from 'express';

export const isGuest: RequestHandler = (req: ReqUser, res, next) => {
    if (req.user && req.user.role === 'guest') {
        return next();
    } else {
        return res.status(401).json({ msg: ';(' });
    }
}

export const tokenCheckpoint: RequestHandler = (req, res, next) => {
    return passport.authenticate('bearer', (err, user) => {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
}

interface ReqUser extends Request {
	user: {
		id: number;
		role: string;
	};
}