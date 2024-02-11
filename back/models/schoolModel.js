//schoolModel.js
const mongoose = require('mongoose');
require('mongoose-type-url');
// const validator = require('validator');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  site: {
    type: mongoose.SchemaTypes.Url,
  },
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
