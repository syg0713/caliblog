const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const searchAPIRouter = require('./routes/search');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공 db 연결 성공 db 연결 성공 db 연결 성공 db 연결 성공 db 연결 성공 db 연결 성공 ');
  })
  .catch(console.error);
  
passportConfig();

// 미들웨어
app.use(morgan('dev'));
app.use( '/', express.static('uploads')); // 프론트 서버 uploads 폴더의 파일들을 가져갈수있게 함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  // origin: true,
  origin: 'http://localhost:3060',
  credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
  },
  name: 'caliblog',
}));
app.use(passport.initialize());
app.use(passport.session());

// routes 폴더로 분리: 라우터
app.use('/user', userAPIRouter);
app.use('/post', postAPIRouter);
app.use('/posts', postsAPIRouter);
app.use('/search', searchAPIRouter);

// 서버 실행
app.listen(3065, () => {
  console.log('server is running on localhost:8080]')
});