//masterModel.js
const mongoose = require('mongoose');

// const validator = require('validator');

const masterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'Course must belong to a school.'],
  },
});

const Master = mongoose.model('Master', masterSchema);

module.exports = Master;
