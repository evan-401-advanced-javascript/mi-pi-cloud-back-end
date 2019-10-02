'use strict';

module.exports = (req, res, next) => {
  const modelName = req.params.model;

  //what are req.paras "http://localhost:808/v1/api/model/:modelName"

  req.model = require(`../model/${modelName}`);
  next();
};