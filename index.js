const express = require("express");
const path = require("path");

const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database");

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

// Get routes
app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts: blogposts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  console.log(req.params);
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", {
    blogpost,
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

//Post routes
app.post("/posts/store", async (req, res) => {
  console.log(req.body);
  try {
    const blogpost = await BlogPost.create(req.body);
    if (blogpost) {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});
