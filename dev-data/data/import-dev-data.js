const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: `./.env` });
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<NAME>', process.env.DATABASE_NAME);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
async function importData() {
  try {
    await Tour.create(tours);
    await Review.create(reviews);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

async function deleteData() {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
