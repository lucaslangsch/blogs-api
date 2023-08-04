const route = require('express').Router();
const { postController } = require('../controller');
const validateJwt = require('../middleware/validateJwt');
const validatePost = require('../middleware/validatePost');
const validatePostToUpdate = require('../middleware/validatePostToUpdate');

route.post(
  '/post',
  validateJwt,
  validatePost,
  postController.createPost,
  );
route.get('/post', validateJwt, postController.getAllPosts);
route.get('/post/:id', validateJwt, postController.getPost);
route.put('/post/:id', validateJwt, validatePostToUpdate, postController.updatePost);

module.exports = route;