import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';
import db from '../db';
import { validateToken } from '../services/tokens';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await validateToken(token);
        let [user] = await db.users.find('id', payload.userid);
        if (user) {
            delete user.password;
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log(error);
        done(error);
    }
}));