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
    validate: {
      validator: async function (email) {
        // Ensure email is unique
        const user = await UserModel.findOne({ email });
        return !user; // Returns true if email is unique, false otherwise
      },
      message: 'Email address is already in use.',
    },
  },
  password: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;