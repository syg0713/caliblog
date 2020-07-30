const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.User,
        attributes: ['id','userId'],
      }],
      offset: parseInt(req.query.offset, 10),
      limit: parseInt(req.query.limit, 10),
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
    });
    const postsAll = await db.Post.findAll({
      include: [{
        model: db.User,
      }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ posts, postsAll });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
