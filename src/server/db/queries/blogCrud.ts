import { Query } from '../index';
import { TBlogs } from '../models/blogs';

const findAllBlogPosts = () => Query("SELECT blogs.*, authors.name, CASE WHEN tags.name IS NULL THEN 'none' ELSE GROUP_CONCAT(tags.name SEPARATOR ';;') END AS tags FROM blogs JOIN authors ON authors.id = blogs.authorid LEFT JOIN blogtags ON blogtags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogtags.tagid WHERE authors.id = 1 GROUP BY blogs.id");
const findBlogEntry = (id: string) => Query<TBlogs[]>("SELECT blogs.*, authors.name, CASE WHEN tags.name IS NULL THEN 'none' ELSE GROUP_CONCAT(tags.name SEPARATOR ';;') END AS tags FROM blogs JOIN authors ON authors.id = blogs.authorid LEFT JOIN blogtags ON blogtags.blogid = blogs.id LEFT JOIN tags ON tags.id = blogtags.tagid WHERE authors.id = 1 AND blogs.id = ? GROUP BY blogs.id", [ id ]);

const addOne = (title: string, content: string) =>
  Query("INSERT INTO blogs (title, content, authorid) VALUES (?)", [[title, content, 1]]);
const addBlogTag = (blogId: string, tagId: string) =>
  Query("INSERT INTO blogtags (blogid, tagid) VALUES (?)", [[blogId, tagId]]);

const updateBlog = (blogId: string, title: string, content: string) => Query("Call spUpdateBlog (?)", [[blogId, title, content]]);
const destroy = (id: string) => Query("delete from blogtags where blogid = ?", [id]);
const destroyBlog = (id: string) => Query("delete from blogs where id= ?", [id]);

export default {
  addOne,
  addBlogTag,
  findAllBlogPosts,
  findBlogEntry,
  destroy,
  destroyBlog,
  updateBlog
}
