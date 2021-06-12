import express from "express";
import Post from "../models/Post.js";

export const getAll = async (req, res) => {
    const post = await Post.find();
    res.status(200).send(post);
};

export const postOne = async (req, res) => {
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

export const getOne = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
      res.status(200);
    } catch {
      res.status(404);
      res.send({ error: "Query doesn't exist!" });
    }
  };