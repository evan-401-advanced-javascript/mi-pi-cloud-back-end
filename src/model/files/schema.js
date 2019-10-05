'use strict';

const mongoose = require('mongoose');

const files = mongoose.Schema({
  title: { type: String, required: true },
  buffer: { type: String, required: true },
});

module.exports = mongoose.model('Files', files);