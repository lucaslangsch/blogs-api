const route = require('express').Router();
const { userController } = require('../controller');
const validateDisplayName = require('../middleware/validateDisplayName');
const validateEmail = require('../middleware/validateEmail');
const validatePassword = require('../middleware/validatePassword');

route.post('/user', validateDisplayName, validateEmail, validatePassword, userController.signUp);

module.exports = route;