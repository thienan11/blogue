// mongodb+srv://blogue:gI1yt6aXrGUfV1a2@cluster0.nxrwv81.mongodb.net/?retryWrites=true&w=majority
// gI1yt6aXrGUfV1a2

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
// const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "1234567890qwertyuioasdfghjkzxcvbnm";

const port = process.env.PORT || 4000;

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors(
  {credentials:true,
    origin:'https://bloguetown.vercel.app'
  }));

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.set("view engine", "ejs");

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
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .json({
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
  // res.cookie("token", "").json("ok");
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.post("/post", async (req, res) => {
  // const { originalname, path } = req.file;
  // const parts = originalname.split(".");
  // const ext = parts[parts.length - 1];
  // const newPath = path + "." + ext;
  // fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      // image: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });

  // const { token } = req.cookies;
  //   jwt.verify(token, secret, {}, async (err, info) => {
  //     if (err) {
  //       res.status(401).json("Unauthorized");
  //       return;
  //     }
  //     const { title, summary, content } = req.body;
  //     try {
  //       const postDoc = await Post.create({
  //           title,
  //           summary,
  //           content,
  //           author: info.id,
  //       });
  //       res.json(postDoc);
  //     } catch (error) {
  //       res.status(400).json(error);
  //   }
  // });
});

app.put("/post", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author!!");
    }

    // await postDoc.update({
    //   title,
    //   summary,
    //   content,
    // });

    // if (postDoc) {
    //   res.json(postDoc); // This will send the updated document back with a 200 OK status
    // } else {
    //   res.status(404).send('Post not found');
    // }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, summary, content },
      { new: true }
    ); // Make sure you're actually getting the updated document with { new: true }

    if (updatedPost) {
      res.json(updatedPost); // This will send the updated document back with a 200 OK status
    } else {
      res.status(404).send("Post not found");
    }
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const currUser = await User.findOne({ email });
    if (!currUser) {
      return res.status(404).json("User does not exist!");
    }
    const new_secret = secret + currUser.password;
    const token = jwt.sign(
      { email: currUser.email, id: currUser._id },
      new_secret,
      {
        expiresIn: "5m",
      }
    );
    const link = `https://bloguetown.vercel.app/reset-password/${currUser._id}/${token}`;

    console.log(link);
  } catch (error) {
    res.status(400).json("Error occurred.")
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const currUser = await User.findOne({ _id: id });
  if (!currUser) {
    return res.status(404).json("User does not exist!");
  }
  const new_secret = secret + currUser.password;
  try {
    const verify = jwt.verify(token, new_secret);
    res.send("Verified!!");
    // res.render("resetPassword", {email: verify.email});
    console.log("verified");
  } catch (error) {
    console.log(error);
    res.send("Not verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  const currUser = await User.findOne({ _id: id });
  if (!currUser) {
    return res.status(404).json("User does not exist!");
  }
  const new_secret = secret + currUser.password;
  try {
    const verify = jwt.verify(token, new_secret);
    const newEncryptedPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: newEncryptedPassword,
        },
      }
    );
    res.json("Password Updated!");
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong while updating password!");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// if (process.env.NODE_ENV === 'development') {
//   console.log('Logging an error stack trace for debugging:');
// } else {
//   console.log('Logging minimal error information for production:');
// }

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

module.exports = app;
