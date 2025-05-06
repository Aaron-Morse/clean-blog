const mongoose = require("mongoose");

const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database");

BlogPost.create({
  title: "Title",
  body: "Body",
});

async function createDocument() {
  try {
    const result = await BlogPost.create({
      title: "Title 1",
      body: "Body 1",
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

createDocument();
