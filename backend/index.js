// mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority
// gI1yt6aXrGUfV1a2

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
  const {username, email, password} = req.body;

  try {
    const userDoc = await User.create({
      username,
      email,
      password
    });
    res.json(userDoc);
  } catch (e){
    res.status(400).json(e);
  }
  
})

app.listen(4000);

// UserSchema.path('email').validate(function (email) {
//   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')