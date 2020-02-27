import { Query } from '../index';

const findTags = () => Query<{}[]>("SELECT * FROM tags");

export default {
  findTags
}
