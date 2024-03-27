// mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority
// gI1yt6aXrGUfV1a2

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "1234567890qwertyuioasdfghjkzxcvbnm";

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors(
  {credentials:true,
    origin:'https://bloguetown.vercel.app'
  }));

app.use(express.json());
app.use(cookieParser());

// mongoose.connect('mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority');
mongoose.connect(
  "mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials.");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    image: newPath,
  });

  res.json(postDoc);
});

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// app.listen(4000);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

// UserSchema.path('email').validate(function (email) {
//   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'The e-mail field cannot be empty.')

module.exports = app;