const route = require('express').Router();
const { categoryController } = require('../controller');
const validateNameCategory = require('../middleware/validateNameCategory');
const validateJwt = require('../middleware/validateJwt');

route.post('/categories', validateJwt, validateNameCategory, categoryController.createCategory);
route.get('/categories', validateJwt, categoryController.getCategories);

module.exports = route;