import debug from 'debug';
import sequelize from 'sequelize';
// import nodemailer from 'nodemailer';
// import uuidv4 from 'uuid';
import expressValidation from 'express-validation';
import models from '../../models';
import { APISuccess, APIClientError } from '../../helpers/APIResponse';

const log = debug('comment.controller'); // eslint-disable-line
const Comment = models.blogComment;

// pagination
// Pagination functions-
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: comment } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, comment, totalPages, currentPage };
};
// ADD NEW COMMENT
export const addComment = async (req, res) => {
  try {
    const { content, username, email, blogId } = req.body;

    const result = await Comment.create({
      content,
      username,
      email,
      blogId,
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

// get comment by postId;
export const getCommentByPostid = async (req, res) => {
  const { id } = req.params;
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const data = await Comment.findAndCountAll({
      limit,
      offset,
      order: [[sequelize.literal('created_at'), 'DESC']],
      where: { blogId: id },
    });
    const result = getPagingData(data, page, limit);
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

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    });
    const response = new APISuccess({
      msg: 'comment has been deleted',
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
