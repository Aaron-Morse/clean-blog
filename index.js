// Import Dependencies
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Initialize App
const app = express();

// Database Connection
mongoose.connect("mongodb://localhost/my_database");

// App Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Middleware
const validateMiddleWare = require("./middleware/validationMiddleware");

// Controllers
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

// Routes
// GET Routes
app.get("/", homeController);
app.get("/post/:id", getPostController);
app.get("/posts/new", newPostController);
app.get("/auth/register", newUserController);
app.get("/auth/login", loginController);

// POST Routes
app.post("/posts/store", validateMiddleWare, storePostController);
app.post("/users/register", storeUserController);
app.post("/users/login", loginUserController);

// Start Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
