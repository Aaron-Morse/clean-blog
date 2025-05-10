const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = (req, res) => {
  let image = req.files.image;
  const imagePath = path.resolve(
    __dirname,
    "..",
    "public/img",
    image.name
  );

  image.mv(imagePath, async (error) => {
    await BlogPost.create({
      ...req.body,
      image: `/img/${image.name}`,
    });
    res.redirect("/");
  });
};
