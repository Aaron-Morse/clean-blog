const express = require("express");
const path = require("path");

const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/my_database");

// Middleware
const validateMiddleWare = (req, res, next) => {
  if (
    req.files === null ||
    req.body.title === null ||
    req.body.body === null
  ) {
    return res.redirect("/posts/new");
  }
  next();
};
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

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
app.post("/posts/store", validateMiddleWare, (req, res) => {
  let image = req.files.image;
  const imagePath = path.resolve(__dirname, "public/img", image.name);

  image.mv(imagePath, async (error) => {
    await BlogPost.create({
      ...req.body,
      image: `/img/${image.name}`,
    });
    res.redirect("/");
  });
});
