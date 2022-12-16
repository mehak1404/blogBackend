/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["result_", "_id"] }] */
import debug from 'debug';
import expressValidation from 'express-validation';
import models from '../../models';
import { APISuccess, APIClientError } from '../../helpers/APIResponse';
import { countWords, createSlugFromTitleForPreviewBlog } from '../../helpers/blogHelper';

const log = debug('previewBlog.controller'); // eslint-disable-line
const Blog = models.previewBlog;

export const fetchAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();

    const response = new APISuccess({
      data: blogs,
    });

    res.send(response.jsonify());
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

export const addNewBlog = async (req, res, next) => {
  try {
    // Check if password and confirmPassword are the same

    const { title, shortDescription, bannerImageUrl, author, bodyHtml,body } = req.body;
    const slug = await createSlugFromTitleForPreviewBlog(title);
    const str = title + shortDescription + body;
    const wordCount = countWords(str);
    const readingTime = wordCount / 200;
    const newBlog = {
      title,
      shortDescription,
      bannerImageUrl,
      bodyHtml,
      body,
      slug,
      author,
      wordCount,
      readingTime,
    };
    const result = await Blog.create(newBlog);
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
export const getBlog = async (req, res, next) => {
  try {
    const Slug = req.params.slug;
    const result = await Blog.findAll({ where: { slug: Slug } });
    const response = new APISuccess({
      result,
    });
    res.send(response.jsonify());
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
