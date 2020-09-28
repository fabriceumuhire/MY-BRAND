const Post = require("../models/Post");
const express = require("express");

exports.getAll = async (req, res) => {
    const post = await Post.find();
    res.send(post);
    res.status(200);
};

exports.postOne = async (req, res) => {
    const post = new Post({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    await post.save();
    res.send(post);
    res.status(200);
  };

  exports.getOne = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
      res.status(200);
    } catch {
      res.status(404);
      res.send({ error: "Query doesn't exist!" });
    }
  };