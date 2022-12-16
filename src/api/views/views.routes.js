import express from 'express';
import passport from 'passport';
import debug from 'debug';
// import validation from './likes.validation';

import * as controller from './views.controller';

import ACL from '../../lib/acl/casbin';
import wrapAsync from '../../helpers/wrapAsync';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
const log = debug('views.routes');// eslint-disable-line

// Get all number likes of a Blog
router.get(
  '/views/:blogId',
  passportJWT,
  ACL,
  wrapAsync(controller.getBlogViewsNumber),
);
// Get all number of likes and info
router.get(
  '/views/info/:blogId',
  passportJWT,
  ACL,
  wrapAsync(controller.getBlogViews),
);

module.exports = router;
