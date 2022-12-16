/* eslint-disable prettier/prettier */

export default function(sequelize, DataTypes) {
  const blogComment = sequelize.define(
    'Comment',
    {

      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },

    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );
  return blogComment;
}
