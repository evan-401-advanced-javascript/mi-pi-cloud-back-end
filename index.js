// Our entry file
'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const mongoose = require('mongoose');

// configures and starts a server
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
server.start();