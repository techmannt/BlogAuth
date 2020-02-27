import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import db from '../db';
import { compareHash } from '../services/password';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let [user] = await db.users.find('email', email);
        if (user.email && compareHash(password, user.password)) {
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