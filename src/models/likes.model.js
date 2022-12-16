export default function(sequelize, DataTypes) {
  const likes = sequelize.define('Likes', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return likes;
}
