const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  username: {type: String, required: true, min: 4, unique: true},
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email address format.',
    },
  },
  password: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;