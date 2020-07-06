module.exports = ( sequelize, DataTypes ) => {
  const User = sequelize.define('User', { // 테이블 명은 소문자 users
    nickname: {
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
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
    db.User.hasMany(db.Post);
  };

  return User;
};