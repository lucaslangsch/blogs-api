const route = require('express').Router();
const { userController } = require('../controller');
const validateDisplayName = require('../middleware/validateDisplayName');
const validateEmail = require('../middleware/validateEmail');
const validatePassword = require('../middleware/validatePassword');
const validateJwt = require('../middleware/validateJwt');

route.post('/user', validateDisplayName, validateEmail, validatePassword, userController.signUp);
route.get('/user', validateJwt, userController.getAllUser);
route.get('/user/:id', validateJwt, userController.getUserById);

module.exports = route;