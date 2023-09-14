const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverView = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.tourSlug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.login = (req, res) => {
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // )
    .render('login', { title: 'Log into your account' });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Your account' });
};

exports.updateUserData = catchAsync(async (req, res, next) => {});
