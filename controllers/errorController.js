const AppError = require('./../utils/appError');

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err) {
  const value = err.keyValue.name;
  const message = `Duplicate field value : ${value} .please use another value`;

  return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
}

function handleJWTError() {
  return new AppError('Invalid token. Please log in again', 401);
}

function handleJWTExpiredError() {
  return new AppError('Your token has expired. Please log in again', 401);
}

function sendErrorDev(err, req, res) {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  console.error('ERROR :', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
}

function sendErrorProd(err, req, res) {
  if (!req.originalUrl.startsWith('/api')) {
    if (err.isOperational)
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: err.message,
      });

    console.error('ERROR :', err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: 'Please try again later',
    });
  }
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  console.error('ERROR :', err);
  return res
    .status(500)
    .json({ status: 'fail', message: 'Something went very wrong' });
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err, name: err.name };
    let error = Object.assign(err);

    // error.name = err.name;
    // error.code = err.code;
    // error.message = err.message;
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, req, res);
  }
};
