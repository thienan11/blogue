const path = require('path'); // Import the path module
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();

// app.post('/register', (req, res) => {
//   const {username, password} = req.body;
//   res.json({requestData:{username,password}});
  
// })

// app.listen(4000);


// mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority

// gI1yt6aXrGUfV1a2

mongoose.connect('mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority');
