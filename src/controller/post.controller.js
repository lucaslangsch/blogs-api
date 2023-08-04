const { getPayload } = require('../auth/authFunction');
const { postService } = require('../service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const payload = getPayload(token);
  const { id } = payload;
  const { title, content, categoryIds } = req.body;
  const { status, data } = await postService.createPost(id, title, content, categoryIds);
  res.status(mapStatusHTTP(status)).json(data);
};

const getAllPosts = async (req, res) => {
  const { status, data } = await postService.getAllPosts();
  res.status(mapStatusHTTP(status)).json(data);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.getPost(id);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
};