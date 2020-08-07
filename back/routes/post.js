const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, upload.none(), async ( req, res, next ) => {
  try {
    const newPost = await db.Post.create({
      title: req.body.title, 
      content: req.body.content,
      UserId: req.user.id,
    });
    // if (req.body.image) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
    //   if (Array.isArray(req.body.image)) {
    //     const images = await Promise.all(req.body.image.map((image) => {
    //       return db.Image.create({ src: image });
    //     }));
    //     await newPost.addImages(images);
    //   } else { // 이미지를 하나만 올리면 image: 주소1
    //     const image = await db.Image.create({ src: req.body.image });
    //     await newPost.addImage(image);
    //   }
    // }

    // 사용자 찾기
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
        attributes: ['id','userId'],
      }],
    });
    // const fullPost = await db.Post.findOne({
    //   where: { id: newPost.id },
    //   include: [{
    //     model: db.User,
    //     attributes: ['id'],
    //   }, {
    //     model: db.Image,
    //   }],
    // });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id', async ( req, res, next ) => {
  try{
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id','userId'],
      }],
    });
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await db.Post.destroy({ where: { id: req.params.id } });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post('/images', upload.array('image'), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});


module.exports = router;