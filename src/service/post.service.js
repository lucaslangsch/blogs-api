const { Category, BlogPost, User } = require('../models');

const createPost = async (name) => {
  const newPost = await Category.create({ name });
  return { status: 'CREATED', data: newPost };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
        as: 'categories',
        through: {
          attributes:
            { exclude: ['postId', 'categoryId'] },
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