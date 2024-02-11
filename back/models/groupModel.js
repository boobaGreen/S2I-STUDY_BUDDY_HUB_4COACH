const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group must have a name'],
    unique: true,
    index: true, // altrimenti unique non funziona
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'Group must refer to a course'],
  },
  master: {
    type: mongoose.Schema.ObjectId,
    ref: 'Master',
    required: [true, 'Group must refer to a master'],
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'Group must refer to a school'],
  },
  founder: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Group must refer to a founder'],
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },

      dateStart: { type: Date, default: Date.now() },
      dateEnd: { type: Date, default: null },
    },
  ],

  maxParticipants: {
    type: Number,
    default: 2,
  },
  currentParticipantsNumber: {
    type: Number,
    virtual: true,
    get: function () {
      return this.participants.length;
    },
  },
  chat: [
    {
      user: {
        type: String,
        required: [true, 'Chat message must have a user'],
      },
      message: {
        type: String,
        required: [true, 'Chat message must have a message'],
      },
      date: {
        type: Date,
        default: Date.now,
        required: [true, 'Chat message must have a date'],
      },
    },
  ],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
