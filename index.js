const express = require('express');
const dotenv = require('dotenv');

const app = express();
const mongoose = require('mongoose');

const morgan = require('morgan');

app.use(morgan('dev'));

dotenv.config();

const connectDB = () => {
  try {
    mongoose.connect(
      process.env.MONGO_CONNECT_STRING,
      { useNewUrlParser: true },
      () => {
        console.log('Connected to DB');
      }
    );
  } catch (error) {
    console.log('Could not connect to DB');
  }
};

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
