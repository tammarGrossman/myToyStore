const express = require('express');
const authentication = require('../utils/authentication')
const toysController  = require('../controllers/toys.controller');
const toysRouter = express.Router();

// Route to get all toys
toysRouter.route('/')
  .get(toysController.getAll);

toysRouter.route('/search')
  .get(toysController.getBySearch);
toysRouter.route('/category/:catname')
  .get(toysController.getByCategory);

toysRouter.route('/single/:id')
  .get(toysController.getByID)

toysRouter.route('/add')
  .post(authentication.isLoggedIn,toysController.add)
  toysRouter.route('/:toyID')
  .all(authentication.isLoggedIn)
  .put(toysController.update)
  .delete(toysController.remove)
  
module.exports = toysRouter;
