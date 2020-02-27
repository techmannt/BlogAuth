import * as mysql from 'mysql';
import config from '../config';

const connection = mysql.createConnection(config.mysql);

export const Query = <T=any>(query: string, values?: Array<any>) => {
  return new Promise<T>((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

import blogCrud from './queries/blogCrud';
import findTags from './queries/tags';
import users from './queries/users';
import tokens from './queries/tokens';

export default {
  blogCrud,
  findTags,
	users,
	tokens
}
