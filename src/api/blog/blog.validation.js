/* eslint-disable prettier/prettier */
import Joi from 'joi';

export default {
  fetchAll: {},
  addNewBlog: {
    body: {
      title: Joi.string().required(),
      shortDescription: Joi.string().required(),
      bannerImageUrl: Joi.string().required(),
      body: Joi.string().required(),
      keywords: Joi.string().required(),
    },
  }
};

