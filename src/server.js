const express = require('express');
const fileUpload = require('express-fileupload');
// const path = require(path);

// server level middleware libraries
const morgan = require('morgan');
const cors = require('cors');

// custom middleware
const errorHandler = require('./middleware/server-error.js');
const notFound = require('./middleware/not-found.js');

// Routes
const authRouter = require('./route/auth.js');

// Models

// const authRouter;
const server = express();



server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.use(authRouter);

// refactor this
server.use(fileUpload());
server.post('/upload', (req, res) => {
  if(req.files === null) {
    return res.status(400).json({ msg: 'No File Uploaded'});
  }

  const file = req.files.file;
  console.log(file);
  file.mv(`/Users/evan/codefellows/401/mi-pi-cloud/mi-pi-cloud-front-end/public/uploads/${file.name}`, err => {
    if(err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
  })
});

///

server.use('*', notFound);
server.use(errorHandler);

module.exports = {
  server: server,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    server.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
}