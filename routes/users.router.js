const express = require('express');
const usersController  = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.route('')
  .post(usersController.signIn);

usersRouter.route('/login')
  .post(usersController.logIn);

  module.exports = usersRouter;
