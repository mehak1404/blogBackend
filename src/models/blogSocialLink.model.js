export default function(sequelize, DataTypes) {
  const blogSocialLink = sequelize.define(
    'blogsocialLink',
    {
      type: {
        allowNull: false,
        type: DataTypes.ENUM([
          'TELEGRAM',
          'FACEBOOK',
          'TWITTER',
          'INSTAGRAM',
          'WHATSAPP',
        ]),
      },
      postLink: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );
  return blogSocialLink;
}
