//userGoogleModel.js
const validator = require('validator');
const mongoose = require('mongoose');
// const validator = require('validator');

const googleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  // photo: {
  //   type: String, // Puoi anche usare un tipo di dato specifico per le immagini, ad esempio Buffer
  // },
  role: {
    type: String,
    enum: ['user', 'mod', 'admin', 'tutor'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Ban'],
    default: 'Active',
  },
  // Altri campi specifici per gli utenti Google
});
googleUserSchema.methods.changedPasswordAfter = function () {
  // False means NOT change
  return false;
};

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser;
