import debug from 'debug';
import HTTPStatus from 'http-status';
import { red, green, blue } from 'chalk';
// eslint-disable-next-line no-unused-vars
import passportMiddleware from './passport';
import { APIClientError } from './helpers/APIResponse';
import wrapAsync from './helpers/wrapAsync';

// Routes
import userRoutes from './api/user/user.routes';
import authRoutes from './api/auth/auth.routes';
import blogRoutes from './api/blog/blog.routes';
import previewRoutes from './api/previewBlog/previewBlog.routes';
import likesRoutes from './api/likes/likes.routes';
import viewsRoutes from './api/views/views.routes';
import commentRoutes from './api/comments/comment.route';

const log = debug('routes');

export default app => {
  // logger
  app.use((req, res, next) => {
    log(
      `${blue(new Date().toISOString())} [${red(req.method)}] ${green(
        req.url,
      )}`,
    );
    next();
  });

  // Insert routes below
  app.use('/api', userRoutes);
  app.use('/api', authRoutes);
  app.use('/api', blogRoutes);
  app.use('/api', previewRoutes);
  app.use('/api', likesRoutes);
  app.use('/api', viewsRoutes);
  app.use('/api', commentRoutes);

  // Handler for invalid routes
  app.all(
    '*',
    // eslint-disable-next-line
    wrapAsync(async (req, res, next) => {
      throw new APIClientError(
        {
          message: 'Invalid route.',
        },
        HTTPStatus.NOT_FOUND,
        HTTPStatus['404'],
      );
    }),
  );
};
