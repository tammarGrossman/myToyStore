const asyncWrap = require("../utils/asyncWrapper");
const { decodeToken } = require("../utils/jwt");
const AppError = require("../errors/AppError");
const User  = require("../models/User.model");

exports.getOwnerUser = async (user_id) => {
  const ownerUser = await User.findOne({id:user_id});
  return ownerUser;
}

// exports.isLoggedIn = asyncWrap(async (req, res, next) => {
//   const {user_id} = req.body;
//   const ownerUser = await getOwnerUser(user_id);
//   console.log(ownerUser);
//   const token = ownerUser.token;
//   if (!token) {
//     return next(new AppError(401, "Please login"));
//   }

//   const payload = decodeToken(token);
//   const id = payload._doc.id;
//   console.log(id);

//   const user = await User.findById(id);

//   if (!user) {
//     return next(new AppError(403, "Please login"));
//   }

//   req.user = user;
//   console.log(req.user);

//   next();
// });

exports.isLoggedIn = asyncWrap(async (req, res, next) => {
  const cookieHeader = req.headers.cookie;
 
  if (!cookieHeader || !cookieHeader.includes("jwt")) {
    return next(new AppError(403, "Please login"));
  }

  const token = cookieHeader.split("=")[1];

  if (!token) {
    return next(new AppError(401, "Please login"));
  }

  const payload = decodeToken(token);
  const userId = payload._doc.id;

  // Optionally, you can fetch the user from the database and attach it to req.user
  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError(403, "Please login"));
  }
  req.user = user;
  next();
});


exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'premium']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "You do not have permission to perform this action")
      );
    }
    next();
  };
};
exports.authNoPermishion = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  token = token.split(" ")[1];
  try {
    const payload = decodeToken(token);
    // console.log(payload);
    // req.userId = payload?._doc?.id;
    res.locals.userId = payload._doc.id;
    console.log(payload._doc.id);
    next();
  } catch (error) {
    next(error);
  }
};
