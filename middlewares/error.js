const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  
  //const error = new ErrorHandler(statusCode, message);
  res.status(statusCode).json({
    success: false,
    error: message,
  });
  next(new ErrorHandler(statusCode, message)); 
};
/*const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";

  ErrorHandler(err, res);
};*/
