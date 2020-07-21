module.exports = ( sequelize, DataTypes ) => { // 모델은 테이블
  const User = sequelize.define('User', { // 테이블 명은 소문자 users
    userId: { // User 테이블 안에 userId 컬럼
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    password: {
      type: DataTypes.STRING(100), // 100글자 이하
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글
  });

  User.associate = ( db ) => {
    db.User.hasMany(db.Post, { as: 'Posts' });
  };

  return User;
};