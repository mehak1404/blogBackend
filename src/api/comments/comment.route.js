import express from 'express';
import passport from 'passport';
import debug from 'debug';
import validate from 'express-validation';
import * as controller from './comment.controller';
import validation from './comment.validation';
import wrapAsync from '../../helpers/wrapAsync';
import ACL from '../../lib/acl/casbin';

const router = express.Router();

const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
const log = debug('comment.route'); // eslint-disable-line

// add comment
router.post(
  '/comment/add',
  passportJWT,
  ACL,
  validate(validation.addComment),
  wrapAsync(controller.addComment),
);

// get comment by blog id;
router.get(
  '/comment/:id',
  passportJWT,
  ACL,
  wrapAsync(controller.getCommentByPostid),
);

// delete comment by id
router.delete(
  '/comment/delete/:id',
  passportJWT,
  ACL,
  wrapAsync(controller.deleteComment),
);

export default router;
