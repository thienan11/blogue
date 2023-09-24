const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const postSchema = new Schema({
  title: String,
  summary: String,
  photo: String,
  content: String,
  author: String,
  likes: Number,
  date: Date,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;