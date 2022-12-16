import express from 'express';
import passport from 'passport';
import debug from 'debug';
import validate from 'express-validation';
import * as controller from './previewBlog.controller';
import validation from './previewBlog.validation';
import wrapAsync from '../../helpers/wrapAsync';
import ACL from '../../lib/acl/casbin';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
const log = debug('previiew.routes'); // eslint-disable-line

// POST
router.post(
  '/preview_blog/add',
  passportJWT,
  ACL,
  validate(validation.addNewBlog),
  wrapAsync(controller.addNewBlog),
);

// get by slug
router.get('/preview_blog/:slug', wrapAsync(controller.getBlog));
export default router;
