/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import blogModel from './blog.model';
import blogCommentModel from './blogComment.model';
import userModel from './user.model';
import blogSocialLinkModel from './blogSocialLink.model';
import previewBlogModel from './previewBlog.model';
import likesModel from './likes.model';
import viewsModel from './views.model';

// import blogCommentModel from './blogComment.model';
// import userModel from './user.model';

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    // eslint-disable-next-line no-console
    logging: JSON.parse(process.env.SEQUELIZE_LOGGING) ? console.log : false,
    timezone: '+05:00',
  },
);

fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.' !== 0) && file !== basename && file.slice(-3) === '.js'
  );
});
// .forEach(file => {
//   const filePath = `./${file.toString()}`;
//   console.log(filePath);

//   // const model = require(filePath)(sequelize, Sequelize.DataTypes);
//   // db[model.name] = model;
// });
db.blogComment = blogCommentModel(sequelize, Sequelize.DataTypes);
db.blog = blogModel(sequelize, Sequelize.DataTypes);
db.blogSocialLink = blogSocialLinkModel(sequelize, Sequelize.DataTypes);
db.previewBlog = previewBlogModel(sequelize, Sequelize.DataTypes);
db.views = viewsModel(sequelize, Sequelize.DataTypes);
db.likes = likesModel(sequelize, Sequelize.DataTypes);

db.user = userModel(sequelize, Sequelize.DataTypes);

db.blog.hasMany(db.blogComment, {
  // as: 'comments',
  onDelete: 'cascade',
  onUpdate: 'NO ACTION',
});
db.blogComment.belongsTo(db.blog);
// likes
db.blog.hasMany(db.likes, {
  as: 'likes',
  onDelete: 'cascade',
  onUpdate: 'NO ACTION',
});
db.likes.belongsTo(db.blog);
// views
db.blog.hasMany(db.views, {
  as: 'views',
  onDelete: 'cascade',
  onUpdate: 'NO ACTION',
});
db.views.belongsTo(db.blog);
// user
db.user.hasMany(db.likes, { onDelete: 'cascade' });
db.likes.belongsTo(db.user);
db.user.hasMany(db.views, { onDelete: 'cascade' });
db.views.belongsTo(db.user);
// user has many blogs
db.user.hasMany(db.blog, { onDelete: 'cascade' });
db.blog.belongsTo(db.user);

db.blog.hasMany(db.blogSocialLink, { as: 'sociallinks' });
db.blogSocialLink.belongsTo(db.blog, {
  foreignKey: 'social_linkId',
  as: 'sociallink',
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
