export default function(sequelize, DataTypes) {
  const blog = sequelize.define(
    'blog',
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
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
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
      keywords: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: true,
        type: DataTypes.ENUM(['DRAFT', 'PUBLISHED', 'SCHEDULED']),
      },
      wordCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      readingTime: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      author: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: 'PollPe Admin',
      },
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );
  return blog;
}
