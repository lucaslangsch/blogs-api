const route = require('express').Router();
const { postController } = require('../controller');
const validateJwt = require('../middleware/validateJwt');
const validateJwtBearer = require('../middleware/validateJwtCategory');

route.post(
  '/post',
  validateJwtBearer,
  postController.createPost,
  );

route.get('/post', validateJwt, postController.getAllPosts);

module.exports = route;