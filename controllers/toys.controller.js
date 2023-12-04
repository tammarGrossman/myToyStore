const AppError = require('../errors/AppError');
const ToyModel = require('../models/Toy.model');
const asyncWrap = require('../utils/asyncWrapper');
const ResponseManager = require('../utils/responseManager');

const getAll = asyncWrap(async (req, res) => {
  const {query} = req;
  if(query.page){
  const perPage = 10;
  const limit = query.page * perPage;
  const skip = (query.page - 1) * perPage;
  const toys = await ToyModel.find().skip(skip).limit(limit);
  ResponseManager.sendSuccess(res, toys);
  }
  else{
    const toys = await ToyModel.find();
    ResponseManager.sendSuccess(res, toys);
  }
});


const getBySearch = asyncWrap(async (req, res) => {
  const {query} = req;
  const perPage = 10;
  const limit = query.page * perPage;
  const skip = (query.page - 1) * perPage;
  const s = query.s;
  const toys = await ToyModel.find({$or: [{name:s},{info:s}]}).limit(limit).skip(skip)
  ResponseManager.sendSuccess(res, toys);
});

const getByCategory = asyncWrap(async (req, res) => {
  const category = req.params.catname;
  const {query} = req;
  const perPage = 10;
  const limit = query.page * perPage;
  const skip = (query.page - 1) * perPage;
  const toys = await ToyModel.find({category}).limit(limit).skip(skip)
  ResponseManager.sendSuccess(res, toys);
})

const getByID = asyncWrap(async (req, res) => {
  const {id} = req.params;
  const toy = await ToyModel.findOne({id});
  ResponseManager.sendSuccess(res, toy);
})

const add = asyncWrap(async (req, res) => {
  const toy = req.body;
  const user_id = req.user.id;
  toy.user_id = user_id;
  const newToy = await ToyModel.create(toy);
  console.log(newToy);
  ResponseManager.sendSuccess(res,newToy);
} 
)
const update = asyncWrap(async (req, res) => {
  console.log('hello');
  const toyId = req.params.toyID;
  const updatedToyData = req.body;
  const updatedToy = await ToyModel.findOneAndUpdate({_id:toyId},updatedToyData,{includeResultMetadata:true});
  console.log('up',updatedToy);
  if (updatedToy.value) {
    console.log('hello');
    ResponseManager.sendSuccess(res, updatedToy.value);
  } else {
    ResponseManager.sendError(res, new AppError( 404 ,'Toy not found or you do not have permission to update it' ));
  }
})


const remove = asyncWrap(async (req, res) => {
  const toyId = req.params.toyID; 
  const deletedRow = await ToyModel.findOneAndDelete({_id:toyId},{includeResultMetadata:true})

  console.log(deletedRow);
  if (deletedRow.value) {
    ResponseManager.sendSuccess(res, { message: 'Toy deleted successfully' });
  } else {
    ResponseManager.sendError(res, AppError(404,'Toy not found or you do not have permission to delete it' ));
  }
});

 module.exports = { getAll, getBySearch, getByCategory, add, update, remove, getByID};
  