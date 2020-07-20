const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async ( req, res, next ) => {
  try {
    const newPost = await db.Post.create({
      content: req.body.content, 
    });
    res.json(newPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', ( req, res ) => {

});


module.exports = router;