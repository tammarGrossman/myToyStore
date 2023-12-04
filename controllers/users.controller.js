const UserModel = require('../models/User.model');
const userJoiSchema = require('../utils/user.validate');
const { generateToken } = require("../utils/jwt");
const asyncWrap = require('../utils/asyncWrapper');
const AppError = require('../errors/AppError');
const ResponseManager = require('../utils/responseManager');

const signIn = asyncWrap(async (req, res) => {
  const user = req.body;
  const validate = userJoiSchema.signIn.validate({ ...user }); // Use signIn instead of register
  if (validate.error) {
    ResponseManager.sendError(res, new AppError(401, validate.error.message));
  } else {
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
    const user = await UserModel.findOne({ email ,password});
    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 10,
    });
    
    if (!user || user.password != password) {
      // Invalid credentials
      ResponseManager.sendError(res, new AppError(401, 'Invalid email or password'));
    } else {
      // Successful login
      user.token = token
      ResponseManager.sendSuccess(res, user);
    }
  }
});

module.exports = { signIn, logIn };
