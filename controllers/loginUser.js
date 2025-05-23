const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (user) {
    const same = await bcrypt.compare(password, user.password);
    if (same) {
      req.session.userID = user._id;
      res.redirect("/");
    } else {
      res.redirect("auth/login");
    }
  }
};
