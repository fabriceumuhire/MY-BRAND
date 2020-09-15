const express = require("express");
const Post = require("./models/Post");
const router = express.Router();

router.get("/articles", async (req, res, file) => {
  const articles = await Post.find();
  res.send(articles);
});

router.post("/articles", async (req, res, file) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  });
  await post.save();
  res.send(post);
});

router.get("/articles/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.patch("/articles/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist!" });
  }
});

router.delete("/articles/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist!" });
  }
});

module.exports = router;