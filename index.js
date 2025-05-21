// Import Dependencies
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");

// Initialize App
const app = express();
global.loggedIn = null;

// Database Connection
mongoose.connect("mongodb://localhost/my_database");

// App Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  loggedIn = req.session.userID;
  next();
});
app.use(flash());

// Middleware
const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

// Controllers
const newPostController = require("./controllers/newPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

// Routes
// GET Routes
app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, newPostController);
app.get(
  "/auth/register",
  redirectIfAuthenticatedMiddleware,
  newUserController
);
app.get(
  "/auth/login",
  redirectIfAuthenticatedMiddleware,
  loginController
);
app.get("/auth/logout", logoutController);

// POST Routes
app.post(
  "/posts/store",
  validateMiddleWare,
  authMiddleware,
  storePostController
);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

// Not Found Route
app.use((req, res) => res.render("notfound"));

// Start Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
