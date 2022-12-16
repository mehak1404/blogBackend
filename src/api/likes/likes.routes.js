import express from 'express';
import passport from 'passport';
import debug from 'debug';
// import validation from './likes.validation';

import * as controller from './likes.controller';

import ACL from '../../lib/acl/casbin';
import wrapAsync from '../../helpers/wrapAsync';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
const log = debug('likes.routes');// eslint-disable-line

router.post(
  '/like',
  passportJWT,
  ACL,
  // expressValidation.validate(validation.likes),
  wrapAsync(controller.likeBlog),
);

// Get all number likes of a Blog
router.get(
  '/likes/:blogId',
  passportJWT,
  ACL,
  wrapAsync(controller.getBlogLikesNumber),
);
// Get all number of likes and info
router.get(
  '/likes/info/:blogId',
  passportJWT,
  ACL,
  wrapAsync(controller.getBlogLikes),
);

module.exports = router;
