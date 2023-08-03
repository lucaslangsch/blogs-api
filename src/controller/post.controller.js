const { postService } = require('../service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { status, data } = await postService.createPost(title, content);
  res.status(mapStatusHTTP(status)).json(data);
};

const getAllPosts = async (req, res) => {
  const { status, data } = await postService.getAllPosts();
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createPost,
  getAllPosts,
};