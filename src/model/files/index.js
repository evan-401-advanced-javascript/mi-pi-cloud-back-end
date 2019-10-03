'use strict';

const schema = require('./schema.js');
const MongooseModel = require('../mongoose-model.js');

class Files extends MongooseModel { };

module.exports = new Files(schema);