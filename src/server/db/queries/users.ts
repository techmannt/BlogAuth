import { Query } from '../index';
import { TUsers } from '../models';

const find = (column: string, value: string | number) => Query<TUsers[]>('SELECT * FROM authors WHERE ?? = ?', [column, value]);
const addUser = (name: string, email: string, password: string) => Query("INSERT INTO authors (name, email, password) VALUES (?)", [[name, email, password]]);

export default {
    find,
    addUser
}
