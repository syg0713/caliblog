module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define('Search', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Search.associate = (db) => {
    db.Search.belongsToMany(db.Post, { through: 'PostSearch' });
  };
  return Search;
};
