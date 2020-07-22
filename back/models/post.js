module.exports = ( sequelize, DataTypes ) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false,
      defaultValue: null,
    },
    content: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false,
      defaultValue: null,
    },
  }, {
    charset: 'utf8mb4', // 한글+이모티콘
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 글쓰기
    db.Post.hasMany(db.Image); // 이미지 올리기
  };
  return Post;
};