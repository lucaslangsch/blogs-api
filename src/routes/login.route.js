const route = require('express').Router();
const { signInController } = require('../controller');

route.post('/login', signInController.signIn);

module.exports = route;