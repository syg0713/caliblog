module.exports = ( sequelize, DataTypes ) => {
  const Hashtag = sequelize.define('Hashtag', {
    content: {
      type: DataTypes.STRING(20), // 매우 긴 글
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // 한글+이모티콘
    collate: 'utf8mb4_general_ci',
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
}