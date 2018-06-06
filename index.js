'use strict';

// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const passport = require('passport');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

// const localStrategy = require('./passport/local');
// const jwtStrategy = require('./passport/jwt');

const stylesRouter = require('./routes/styles');
const usersRouter = require('./routes/users');

// Utilize the given `strategy`
// passport.use(localStrategy);
// passport.use(jwtStrategy);

// Create an Express application
const app = express();

// Log all requests. Skip logging during
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  }));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/styles', stylesRouter);
app.use('/users', usersRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
