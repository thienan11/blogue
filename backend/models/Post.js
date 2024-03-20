const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// const postSchema = new Schema({
//   title: String,
//   summary: String,
//   photo: String,
//   content: String,
//   author: [{type:Schema.Types.ObjectId, ref:'User'}],
//   likes: Number,
//   date: Date,
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
// });

const postSchema = new Schema({
  title: String,
  summary: String,
  content: String,
  image: String,
}, {
  timestamps: true,
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;