const UserModel = require('../models/User.model');
const userJoiSchema = require('../utils/user.validate');
const { generateToken } = require("../utils/jwt");
const asyncWrap = require('../utils/asyncWrapper');
const AppError = require('../errors/AppError');
const bcrypt = require('bcryptjs');
const ResponseManager = require('../utils/responseManager');

const signIn = asyncWrap(async (req, res) => {

  const user = req.body;
  const validate = userJoiSchema.signIn.validate({ ...user }); // Use signIn instead of register
  if (validate.error) {
    ResponseManager.sendError(res, new AppError(401, validate.error.message));
  } else {
    const hash = await bcrypt.hash(user.password, 12);
    user.password = hash;
    const newUser = await UserModel.create({ ...user });
    ResponseManager.sendSuccess(res, newUser);
  }
});

const logIn = asyncWrap(async (req, res) => {
  const { email, password } = req.body;

  // Validate the email and password
  const validate = userJoiSchema.login.validate({ password, email });

  if (validate.error) {
    ResponseManager.sendError(res, new AppError(401, 'Invalid email or password'));
  } else {

    // Perform the login logic, e.g., check the credentials against the database
    const user = await UserModel.findOne({ email }).select('+password');
    console.log(user,password);
    const compare = await bcrypt.compare(password,user.password)
   
    
    if (!user || !compare ) {
      // Invalid credentials
      ResponseManager.sendError(res, new AppError(401, 'Invalid email or password'));
    } else {
      // Successful login
      const token = generateToken(user);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 10,
      });
      user.token = token
      ResponseManager.sendSuccess(res, user);
    }
  }
});

module.exports = { signIn, logIn };
