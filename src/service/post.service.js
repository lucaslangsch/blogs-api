const { Category, BlogPost, User, sequelize } = require('../models');

const createPost = async (id, title, content, categoryIds) => {
  const result = await sequelize.transaction(async (t) => {
    const existingCategories = await Category.findAll({
      where: { id: categoryIds },
    });
    if (existingCategories.length !== categoryIds.length) {
      return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
    }
    const newPost = await BlogPost.create(
      { title, content, userId: id },
      {
        transaction: t,
      },
    );
    await newPost.addCategories(categoryIds, { transaction: t });
    return { status: 'CREATED', data: newPost };
  });
  return result;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
        as: 'categories',
        through: {
          attributes:
            [],
          },
        },
    ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};

module.exports = {
  createPost,
  getAllPosts,
};