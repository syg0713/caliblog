const express = require('express');
const db = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
router.get('/', ( req, res ) => {

});
// router. = epxress = app
// post, get, patch, put, delete = HTTP API
// ('/', = REST API
// , async ( req, res, next ) => {.. = 컨트롤러
router.post('/', async ( req, res, next ) => { // POST /api/user 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if ( exUser ) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
    const newUser = await db.User.create({
      userId:req.body.userId,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    // 에러 처리를 여기서
    return next(e);
  }
});
router.post('/login/', ( req, res, next ) => { // POST /api/user/login
  console.log('이거다');

  passport.authenticate('local', (err, user, info) => {
    console.log( err, user, info );
    if ( err ) {
      console.error(err);
      return next(err);
    }
    if ( info ) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      // try {
        if ( loginErr ) {
          return next(loginErr);
        }
        console.log('login success', req.user);
        const filteredUser = Object.assign({}, user.toJSON());
        delete filteredUser.password;
        return res.json(filteredUser);
        // const fullUser = await db.User.findOne({
        //   where: { id: user.id },
        //   include: [{
        //     model: db.Post,
        //     as: 'Posts',
        //     attributes: ['id'],
        //   }],
        //   attributes: ['id','userId'],
        // });
        // console.log(fullUser);
        // return res.json(fullUser);
      // } catch (e) {
      //   next(e);
      // }
    });
  })(req, res, next);
});

router.post('/logout/', ( req, res ) => {
  req.logout();
  req.session.destroy();
  res.send('logout 성공');
});
router.post('/', ( req, res ) => {

});
router.post('/', ( req, res ) => {

});
router.get('/posts/', ( req, res ) => {
  
});

module.exports = router;