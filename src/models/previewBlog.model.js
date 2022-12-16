export default function(sequelize, DataTypes) {
  const previewBlog = sequelize.define(
    'preview_blog',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      shortDescription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bannerImageUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      bodyHtml: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      postLink: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      slug: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  return previewBlog;
}
