const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const server = express();
server.use(express.json());

server.use(cors());
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
  });
});

module.exports = server;