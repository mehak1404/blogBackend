/* eslint-disable import/prefer-default-export */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["result_", "_id"] }] */
import debug from 'debug';
// import nodemailer from 'nodemailer';
// import uuidv4 from 'uuid';
import expressValidation from 'express-validation';
import sequelize from 'sequelize';
import keywordExtractor from 'keyword-extractor';
import models from '../../models';
import { APISuccess, APIClientError } from '../../helpers/APIResponse';
import {
  createSlugFromTitle,
  countWords,
  getPagination,
} from '../../helpers/blogHelper';

const { Op } = require('sequelize');

const log = debug('blog.controller'); // eslint-disable-line
const Blog = models.blog;
const Views = models.views;
// const Comments = models.blogComment;
const baseurl = 'https://localhost:8000/blogs/';

// const urls = {
//   Whatsapp: 'https"://api.whatsapp.com/send?text=',
//   Facebook: 'https://www.facebook.com/sharer.php?u=',
//   Twitter:'https://twitter.com/share?url=[blog-url]&text=[blog-title]&via=[via]&hashtags=[keywords]',
//   LinkedIn:'https://www.linkedin.com/shareArticle?url=[blog-url]&title=[blog-title]',
//   Telegram: 'https://telegram.me/share/url?url=<Blog-Link>&text=<Blog-Title>'

// }

// GET ALL BLOGS
export const fetchAllBlogs = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const blogs = await Blog.findAll({
      limit,
      offset,
      attributes: [
        'id',
        'title',
        'shortDescription',
        'bannerImageUrl',
        'body',
        'bodyHtml',
        'postLink',
        'slug',
        'keywords',
        'state',
        'wordCount',
        'readingTime',
        'author',
        'created_at',

        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM likes WHERE likes.blogId = Blog.id)',
          ),
          'likesCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM views WHERE views.blogId = Blog.id)',
          ),
          'viewsCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM comment WHERE comment.blog_id = Blog.id)',
          ),
          'comments',
        ],
      ],
      order: [[sequelize.literal('viewsCount'), 'DESC']],
    });

    const response = new APISuccess({
      data: blogs,
      PageNo: req.body.page,
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

// FILTERS
export const addFilters = async (req, res, next) => {
  try {
    let { page } = req.query;
    const { size } = req.query;
    if (!page) {
      page = 0;
    }
    const { limit, offset } = getPagination(page, size);
    const filter = req.query;
    const result = await Blog.findAll({
      limit,
      offset,
      attributes: [
        'id',
        'title',
        'shortDescription',
        'bannerImageUrl',
        'body',
        'bodyHtml',
        'postLink',
        'slug',
        'keywords',
        'state',
        'wordCount',
        'readingTime',
        'author',
        'created_at',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM likes WHERE likes.blogId = Blog.id)',
          ),
          'likesCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM views WHERE views.blogId = Blog.id)',
          ),
          'viewsCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM comment WHERE comment.blog_id = Blog.id)',
          ),
          'comments',
        ],
      ],
      where: filter,
    });
    const response = new APISuccess({
      result,
      PageNo: page,
    });

    return res.send(response.jsonify());
  } catch (err) {
    log(err);
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

// SUGGESTIONS

export const suggestionBlogs = async (req, res, next) => {
  try {
    let { page } = req.query;
    const { size } = req.query;
    if (!page) {
      page = 0;
    }
    const { limit, offset } = getPagination(page, size);
    let id1;
    let id2;
    const Currid = req.body.id;

    if (Currid > 1) {
      id1 = Currid - 1;
      id2 = Currid + 1;
    } else {
      id1 = Currid + 1;
      id2 = Currid + 2;
    }

    const blogs = await Blog.findAll({
      limit,
      offset,
      attributes: [
        'id',
        'title',
        'shortDescription',
        'bannerImageUrl',
        'keywords',
        'author',
        'created_at',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM likes WHERE likes.blogId = Blog.id)',
          ),
          'likesCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM views WHERE views.blogId = Blog.id)',
          ),
          'viewsCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM comment WHERE comment.blog_id = Blog.id)',
          ),
          'comments',
        ],
      ],
      where: {
        [Op.or]: [{ id: id1 }, { id: id2 }],
      },
    });

    const response = new APISuccess({
      blogs,
      pageNo: page,
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
// Latest
export const latestBlogs = async (req, res, next) => {
  try {
    let { page } = req.query;
    const { size } = req.query;
    if (!page) {
      page = 0;
    }
    const { limit, offset } = getPagination(page, size);
    const blogs = await Blog.findAll({
      limit,
      offset,
      attributes: [
        'id',
        'title',
        'keywords',
        'author',
        'created_at',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM likes WHERE likes.blogId = Blog.id)',
          ),
          'likesCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM views WHERE views.blogId = Blog.id)',
          ),
          'viewsCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM comment WHERE comment.blog_id = Blog.id)',
          ),
          'comments',
        ],
      ],
      order: [[sequelize.literal('created_at'), 'DESC']],
    });

    const response = new APISuccess({
      data: blogs,
      PageNo: page,
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
// TRENDING
export const trendingBlogs = async (req, res, next) => {
  try {
    let { page } = req.query;
    const { size } = req.query;
    if (!page) {
      page = 0;
    }
    const { limit, offset } = getPagination(page, size);
    const blogs = await Blog.findAll({
      limit,
      offset,
      attributes: [
        'id',
        'title',
        'keywords',
        'author',
        'created_at',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM likes WHERE likes.blogId = Blog.id)',
          ),
          'likesCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM views WHERE views.blogId = Blog.id)',
          ),
          'viewsCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM comment WHERE comment.blog_id = Blog.id)',
          ),
          'comments',
        ],
      ],
      order: [[sequelize.literal('viewsCount'), 'DESC']],
    });

    const response = new APISuccess({
      data: blogs,
      pageNo: page,
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
// POPULAR

export const popularBlogs = async (req, res, next) => {
  try {
    let { page } = req.query;
    const { size } = req.query;
    if (!page) {
      page = 0;
    }
    const { limit, offset } = getPagination(page, size);
    const blogs = await Blog.findAll({
      limit,
      offset,
      attributes: [
        'id',
        'title',
        'keywords',
        'author',
        'created_at',

        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM likes WHERE likes.blogId = Blog.id)',
          ),
          'likesCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM views WHERE views.blogId = Blog.id)',
          ),
          'viewsCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM comment WHERE comment.blog_id = Blog.id)',
          ),
          'comments',
        ],
      ],
      order: [[sequelize.literal('likesCount'), 'DESC']],
    });

    const response = new APISuccess({
      data: blogs,
      pageNo: page,
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
// CREATE A BLOG
export const addNewBlog = async (req, res, next) => {
  try {
    // Check if password and confirmPassword are the same

    const {
      title,
      shortDescription,
      bannerImageUrl,
      author,
      body,
      bodyHtml,
    } = req.body;
    const slug = await createSlugFromTitle(title);
    const postLink = baseurl + slug;
    const wordCount = countWords(body);
    const readingTime = wordCount / 200;
    const newBlog = {
      title,
      shortDescription,
      bannerImageUrl,
      body,
      bodyHtml,
      postLink,
      slug,
      author,
      wordCount,
      readingTime,
      state: 'PUBLISHED',
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

// Update blog
export const updateBlog = async (req, res, next) => {
  try {
    // Check if password and confirmPassword are the same
    let slug;
    let postLink;
    let wordCount;
    let readingTime;
    const {
      title,
      shortDescription,
      bannerImageUrl,
      author,
      body,
      bodyHtml,
    } = req.body;
    const newBlog = {
      title,
      shortDescription,
      body,
      bodyHtml,
      bannerImageUrl,
      author,
    };
    if (title) {
      slug = await createSlugFromTitle(title);
      postLink = baseurl + slug;
      newBlog.slug = slug;
      newBlog.postLink = postLink;
    }
    if (body) {
      wordCount = countWords(body);
      readingTime = Math.floor(wordCount / 200);
      newBlog.wordCount = wordCount;
      newBlog.readingTime = readingTime;
    }
    const result = await Blog.update(
      { blog: newBlog },
      { where: { id: req.params.id }, force: true },
    );
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
// Update Status
export const updateStatus = async (req, res, next) => {
  const { status } = req.body;
  try {
    await Blog.update({ state: status }, { where: { id: req.params.id } });
    const response = new APISuccess('Updated Status');
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
    const blog = await Blog.findAll({ where: { slug: Slug } });

    const blogid = blog[0].id;
    if (blog) {
      await Views.create({ blogId: blogid });
    }

    const result = await Blog.findAll({
      attributes: [
        'id',
        'title',
        'shortDescription',
        'bannerImageUrl',
        'body',
        'bodyHtml',
        'postLink',
        'slug',
        'keywords',
        'state',
        'wordCount',
        'readingTime',
        'author',
        'created_at',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM likes WHERE likes.blogId = Blog.id)',
          ),
          'likesCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM views WHERE views.blogId = Blog.id)',
          ),
          'viewsCount',
        ],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM comment WHERE comment.blog_id = Blog.id)',
          ),
          'comments',
        ],
      ],
      where: { slug: Slug },
    });
    const response = new APISuccess({
      result,
    });

    console.log(response);
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

// Delete
export const deleteAll = async (req, res, next) => {
  try {
    await Blog.destroy({
      where: {},
      force: true,
    });
    res.json('All Blogs Deleted');
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

export const deleteBlog = async (req, res, next) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    })
      .then(res.json('DELETED SUCCESSFULLY'))
      .catch(err => debug(err));
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

// Keywords Generator
export const makeKeywords = async (req, res) => {
  const text = req.body.body;
  try {
    const result = keywordExtractor.extract(text, {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
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
