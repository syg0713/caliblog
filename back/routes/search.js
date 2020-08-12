const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:keyword', async (req, res, next) => {
  try {
    // let where = {};
    // if (parseInt(req.query.lastId, 10)) {
    //   where = {
    //     id: {
    //       [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
    //     },
    //   };
    // }
    console.log(req.params.keyword,'12345678910');
    const posts = await db.Post.findAll({
      where: { title: req.params.keyword },
      include: [{
        model: db.Search,
        // where: { name: decodeURIComponent(req.params.keyword) },
      }, {
        model: db.User,
        attributes: ['id'],
      }, {
        model: db.Image,
      },
    ],
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
