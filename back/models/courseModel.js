//courseMode.js
const mongoose = require('mongoose');
// const validator = require('validator');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  master: {
    type: mongoose.Schema.ObjectId,
    ref: 'Master',
    required: [true, 'Course must belong to a master.'],
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'Course must belong to a school.'],
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
