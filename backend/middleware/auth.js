
const ErrorHandler = require("../utils/ErrorHandler");
const CathasyncError = require("./CathasyncError");
const jwt = require("jsonwebtoken");
const User = require("../modules/UserModules");

exports.isAuthenticated = CathasyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

// Handling user roles
exports.authorizeRoles = ({}) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};