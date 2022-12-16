import debug from 'debug';
// import nodemailer from 'nodemailer';
// import uuidv4 from 'uuid';
import expressValidation from 'express-validation';
import models from '../../models';

import { APISuccess, APIClientError } from '../../helpers/APIResponse';

const log = debug('likes.controller'); // eslint-disable-line
const Likes = models.likes;

export const likeBlog = async (req, res) => {
  try {
    const PostId = req.body.blogId;
    const UserId = req.body.userId;

    const found = await Likes.findOne({
      where: { blogId: PostId, userId: UserId },
    });
    let response;
    if (!found) {
      await Likes.create(req.body);
      response = new APISuccess({
        liked: true,
      });
    } else {
      await Likes.destroy({
        where: { blogId: PostId, userId: UserId },
      });
      response = new APISuccess({
        liked: false,
      });
    }
    return res.send(response.jsonify());
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

export const getBlogLikesNumber = async (req, res) => {
  try {
    const total = await Likes.count({ where: { blogId: req.params.blogId } });
    const response = new APISuccess({
      total,
    });
    return res.send(response.jsonify());
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};
export const getBlogLikes = async (req, res) => {
  try {
    const result = await Likes.findAll({
      where: { blogId: req.params.blogId },
    });
    const response = new APISuccess({
      result,
    });
    return res.send(response.jsonify());
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};
