const express = require('express');
const db = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

router.get('/:keyword', async (req, res, next) => {
  try {
    let keyword = req.params.keyword;
    let where = {};

    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
        title: {
          [Op.like] : "%"+keyword+"%"
        },
      };
    } else if( keyword ) {
      where = {
        title: {
          [Op.like] : "%"+keyword+"%"
        },
      };
    }

    const posts = await db.Post.findAll({
      where,
      // where: { 
      //   title: {
      //     [Op.like] : "%"+keyword+"%"
      //   },
      // },
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
      limit: parseInt(req.query.limit, 10),
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
