module.exports = (req, res) => {
  let username = "";
  let password = "";
  const data = req.flash("data")[0];

  if (data) {
    username = data.username;
    password = data.password;
  }

  res.render("register", {
    errors: req.flash("validationErrors"),
    username,
    password,
  });
};
