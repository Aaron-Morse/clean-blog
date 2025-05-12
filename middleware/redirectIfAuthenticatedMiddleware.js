module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect("/"); // if user is logged in, redirect to home page
  }
  next();
};
