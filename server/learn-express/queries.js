const express = require("express");
const Post = require("./models/Post");
const router = express.Router();

router.get("/queries", async (req, res) => {
  const queries = await Post.find();
  res.send(queries);
});

router.post("/queries", async (req, res) => {
  const post = new Post({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  await post.save();
  res.send(post);
  console.log(req.body);
});

router.get("/queries/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Query doesn't exist!" });
  }
});

module.exports = router;