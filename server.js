process.on('uncaughtException', (err) => {
  console.log(`UNCAUGHT EXCEPTION! Shutting down...`);
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<NAME>', process.env.DATABASE_NAME);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const port = process.env.PORT * 1 || 8000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Listening to port  ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`UNHANDLED REJECTION! Shutting down...`);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
