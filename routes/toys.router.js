const express = require('express');
const authentication = require('../utils/authentication')
const toysController  = require('../controllers/toys.controller');
const toysRouter = express.Router();

// Route to get all toys
toysRouter.route('/domain/toys')
  .get(toysController.getAll);

toysRouter.route('/domain/toys/search')
  .get(toysController.getBySearch);
toysRouter.route('/domain/toys/category/:catname')
  .get(toysController.getByCategory);

toysRouter.route('domain/toys/single/:id')
  .get(toysController.getByID)

toysRouter.route('')
  .post(authentication.isLoggedIn,toysController.add)
  toysRouter.route('/:toyID')
  .all(authentication.isLoggedIn)
  .put(toysController.update)
  .delete(toysController.remove)
  
module.exports = toysRouter;
