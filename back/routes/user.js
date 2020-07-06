const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', ( req, res ) => {

});
router.post('/', async ( req, res, next ) => { // POST /api/user 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.id,
      },
    });
    if ( exUser ) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
    const newUser = await db.User.create({
      // nickname: req.body.nickname,
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
router.post('/login/', ( req, res ) => {

});
router.post('/logout/', ( req, res ) => {

});
router.post('/', ( req, res ) => {

});
router.post('/', ( req, res ) => {

});
router.get('/posts/', ( req, res ) => {
  
});

module.exports = router;