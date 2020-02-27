import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    let users = await db.findTags.findTags();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json('You have an error!');
  }
})


export default router;
