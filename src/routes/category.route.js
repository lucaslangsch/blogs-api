const route = require('express').Router();
const { categoryController } = require('../controller');
const validateNameCategory = require('../middleware/validateNameCategory');
const validateJwt = require('../middleware/validateJwtCategory');

route.post('/categories', validateJwt, validateNameCategory, categoryController.createCategory);

module.exports = route;