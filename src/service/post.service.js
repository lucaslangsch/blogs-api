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

const getPost = async (id) => {
  const post = await BlogPost.findByPk(
    id,
    {
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category,
          as: 'categories',
          through: {
            attributes:
              [],
            } }] },
  );
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  return { status: 'SUCCESSFUL', data: post };
};

const updatePost = async (id, title, content, userId) => {
  const result = await sequelize.transaction(async (t) => {
    const [updatedRows] = await BlogPost.update(
      { title, content },
      { where: { id, userId } },
      {
        transaction: t,
      },
    );
    if (updatedRows === 0) {
      return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
    }

    return getPost(id);
  });
  return result;
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  await BlogPost.destroy({ where: { id } });
  return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};