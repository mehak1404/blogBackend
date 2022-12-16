import express from 'express';
import passport from 'passport';
import debug from 'debug';
import validate from 'express-validation';
import * as controller from './blog.controller';
import validation from './blog.validation';
import wrapAsync from '../../helpers/wrapAsync';
import ACL from '../../lib/acl/casbin';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
const log = debug('blog.routes'); // eslint-disable-line

router.get(
  '/blogs',
  passportJWT,
  ACL,
  validate(validation.fetchAll),
  wrapAsync(controller.fetchAllBlogs),
);
// POST
router.post(
  '/blog/add',
  passportJWT,
  ACL,
  validate(validation.addNewBlog),
  wrapAsync(controller.addNewBlog),
);

// PUT
router.put(
  '/blog/:id',
  passportJWT,
  ACL,
  validate(validation.addNewBlog),
  wrapAsync(controller.updateBlog),
);

// Update Status

router.put('/status/:id', passportJWT, ACL, wrapAsync(controller.updateStatus));
// DELETE
router.delete('/blog/:id', passportJWT, ACL, wrapAsync(controller.deleteBlog));
// DELETE ALL
router.delete('/delete', passportJWT, ACL, wrapAsync(controller.deleteAll));
// Get all blogs
router.get('/blogs', passportJWT, ACL, wrapAsync(controller.fetchAllBlogs));
// suggestions
router.get(
  '/blog/suggestion',
  passportJWT,
  ACL,
  wrapAsync(controller.suggestionBlogs),
);
// latest
router.get('/blog/latest', passportJWT, ACL, wrapAsync(controller.latestBlogs));
// keywords
router.get(
  '/blog/keywords',
  passportJWT,
  ACL,
  wrapAsync(controller.makeKeywords),
);
// Trending
router.get(
  '/blog/trending',
  passportJWT,
  ACL,
  wrapAsync(controller.trendingBlogs),
);
// Popular
router.get(
  '/blog/popular',
  passportJWT,
  ACL,
  wrapAsync(controller.popularBlogs),
);
// get by slug
router.get('/blog/:slug', passportJWT, ACL, wrapAsync(controller.getBlog));
// filter
router.get('/blogs/filter', passportJWT, wrapAsync(controller.addFilters));
export default router;
