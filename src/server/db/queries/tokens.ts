import { Query } from '../index';
import { TTokens } from '../models';

const insert = (userid: number) => Query<{ insertId: number }>('INSERT INTO tokens (userid) VALUE (?)', [[userid]]);
const update = (id: number, token: string) => Query('UPDATE tokens SET token_val = ? WHERE id = ?', [token, id]);
const match = (token_val: string, userid: number, id: number) => Query<TTokens[]>(
    'SELECT * FROM tokens WHERE token_val = ? AND userid = ? AND id = ?'
, [token_val, userid, id]);

export default {
    insert,
    update,
    match
}
