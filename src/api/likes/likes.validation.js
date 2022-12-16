/* eslint-disable prettier/prettier */
import Joi from 'joi';

export default {
  fetchAll: {},
  likes: {
    body: {
      username: Joi.string().required(),
      email: Joi.string(),
      blogId : Joi.number().integer().required(),
      userId: Joi.number().integer().required(),
    },
  },
};

