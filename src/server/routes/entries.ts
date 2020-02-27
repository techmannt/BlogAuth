import * as express from 'express';
import db from '../db';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let [blogEntries] = await db.blogCrud.findBlogEntry(id);
    res.json(blogEntries);
  } catch (error) {
    console.log(error);
    res.status(500).json('You have an error!');
  }
});

router.get('/', async (req, res) => {
  try {
    let users = await db.blogCrud.findAllBlogPosts();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json('You have an error!');
  }
});

router.post('/', async (req, res) => {
  let tagId = req.body.tag;
  let title = req.body.title;
  let message = req.body.message;
  try {
    let result = await db.blogCrud.addOne(title, message);
    await db.blogCrud.addBlogTag(result.insertId, tagId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }

});

router.put('/:id', async (req, res) => {
  let blogId = req.body.blogId;
  let title = req.body.title;
  let message = req.body.content;
  try {
    await db.blogCrud.updateBlog(blogId, title, message);
    res.json('Edited!');
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }
});

router.delete('/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    await db.blogCrud.destroy(blogId);
    await db.blogCrud.destroyBlog(blogId);
    res.json('Deleted!');
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }
});

export default router;
