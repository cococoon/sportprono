const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  unique: true
  },
  firstName: {
    type: String,
    trim: true,
    default: null
  },
  lastName: {
    type: String,
    trim: true,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  facebook:{
    type: String,
    default: null
  },
    twitter:{
    type: String,
    default: null
  },
    linkedin:{
    type: String,
    default: null
  }
});

/**
 * hash password before saving to DB
 * @param password
 * @returns void
 */
UserSchema.pre('save', function(next){
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) return next(err);
    user.password = hash;
    next(err);
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;