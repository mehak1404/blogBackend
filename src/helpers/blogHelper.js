/* eslint-disable prettier/prettier */
import debug from 'debug';
import slugify from 'slugify';
import models from '../models';

const log = debug('blog.helper'); // eslint-disable-line
const Blog = models.blog;

  // Pagination functions-
export const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
  export async function createSlugFromTitle(title) {
    let Slug = slugify(title, { lower: true, strict: true });
    const present = await Blog.findAll({ where: { slug: Slug } });
    if (present.length > 0) {
      Slug += '01';
      console.log(Slug);
    }
    return Slug;
  }

  export async function createSlugFromTitleForPreviewBlog(title) {
    let Slug = slugify(title, { lower: true, strict: true });
    // const present = await previewBlog.findAll({ where: { slug: Slug } });
    // if (present.length > 0) {
    //   Slug += Math.floor(Math.random() * 999);
    //   console.log(Slug);
    // }
    Slug += Math.floor(Math.random() * 999);

    return Slug;
  }

  export function countWords(str) {
    return str.trim().split(/\s+/).length;
  }

  export default { createSlugFromTitle, countWords, createSlugFromTitleForPreviewBlog };



