import debug from 'debug';
// import nodemailer from 'nodemailer';
// import uuidv4 from 'uuid';
import expressValidation from 'express-validation';
import models from '../../models';

import { APISuccess, APIClientError } from '../../helpers/APIResponse';

const log = debug('views.controller'); // eslint-disable-line
const Views = models.views;

export const getBlogViewsNumber = async (req, res) => {
  try {
    const total = await Views.count({ where: { blogId: req.params.blogId } });
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
export const getBlogViews = async (req, res) => {
  try {
    const result = await Views.findAll({
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
