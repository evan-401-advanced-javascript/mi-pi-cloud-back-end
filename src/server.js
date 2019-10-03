const express = require('express');
const fileUpload = require('express-fileupload');

const morgan = require('morgan');
const cors = require('cors');

// custom middleware
const errorHandler = require('./middleware/server-error.js');
const notFound = require('./middleware/not-found.js');

// Routes
const authRouter = require('./route/auth.js');
const apiRouter = require('./route/api');
const fileRouter = require('./route/file-router');

// Models

// const authRouter;
const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.use(authRouter);
server.use(apiRouter);
server.use(fileRouter);

server.use('*', notFound);
server.use(errorHandler);

module.exports = {
  server: server,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    server.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};