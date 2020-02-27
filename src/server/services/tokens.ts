import * as jwt from 'jsonwebtoken';
import db from '../db';
import config from '../config';

export const createToken = async (payload: IPayload) => {
    let result = await db.tokens.insert(payload.userid);
    payload.id = result.insertId;
    const token = await jwt.sign(payload, config.jwt.secret);
    await db.tokens.update(payload.id, token);
    return token;
}

export const validateToken = async (token: string) => {
    const payload = <IPayload>jwt.verify(token, config.jwt.secret);
    const [matched] = await db.tokens.match(token, payload.userid, payload.id);
    if (!matched) {
        throw new Error('Invalid Token!');
    } else {
        return payload;
    }
}

interface IPayload {
    id?: number;
    userid: number;
    role: string;
}