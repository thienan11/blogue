const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const commentSchema = new Schema({
  cid: String,
  username: String,
  text: String,
  date: Date,
  likes: Number,
  edited: Boolean,
});

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;
