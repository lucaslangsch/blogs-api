const route = require('express').Router();
const { postController } = require('../controller');
const validateJwt = require('../middleware/validateJwt');
const validatePost = require('../middleware/validatePost');

route.post(
  '/post',
  validateJwt,
  validatePost,
  postController.createPost,
  );

route.get('/post', validateJwt, postController.getAllPosts);

module.exports = route;