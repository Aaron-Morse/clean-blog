const express = require("express");

const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/my_database");

// Middleware
const validateMiddleWare = require("./middleware/validationMiddleware");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Controllers
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

// Get routes
app.get("/", homeController);

app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

//Post routes
app.post("/posts/store", validateMiddleWare, storePostController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
