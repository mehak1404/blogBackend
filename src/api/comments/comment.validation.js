/* eslint-disable prettier/prettier */
import Joi from 'joi';

export default {
  fetchAll: {},
  addComment: {
    body: {
      content: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
     
    },
  }
};

