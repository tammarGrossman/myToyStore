const express = require('express');
const usersController  = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.route('/signIn')
  .post(usersController.signIn);

usersRouter.route('/logIn')
  .post(usersController.logIn);

  module.exports = usersRouter;
