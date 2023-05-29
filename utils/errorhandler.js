class ErrorHandler extends Error {
  constructor(message,statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/*const handleError = (err, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (!statusCode || statusCode === 500) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }

  let errorMessage = message;

  if (statusCode === 400) {
    if (message === "Please provide an email and password") {
      errorMessage = "Please enter email and password";
    }
  }
  if (statusCode === 401) {
    if (message === "Invalid Email or Password") {
      errorMessage = "Invalid Email or Password";
    }
  }
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};
*/
module.exports = ErrorHandler ;
