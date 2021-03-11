import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import Blog from "../models/Blog.js";
import { articleValidation } from "../validators/articles.js";
dotenv.config();
cloudinary.config("../utils/cloudinary.js")

export const getAll = async (req, res) => {
    const articles = await Blog.find();
    res.send(articles);
    res.status(200);
};

export const postOne = async (req, res) => {
    const { error } = articleValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    try {
        cloudinary.v2.uploader.upload(req.files.image.tempFilePath,(error,result) => {
            const articles = new Blog({
            title: req.body.title,
            content: req.body.content,
            blogImage: result.url,
            publicId: result.public_id,
            });
            articles.save();
            res.send(articles);
        });
    } catch (error) {
        res.send({ error: "Invalid input" });

    }
}; 

export const getOne = async (req, res) => {
    try {
        const articles = await Blog.findOne({ _id: req.params.id });
        res.send(articles);
    } catch {
        res.status(404);
        //res.send({ error: "Article doesn't exist!" });
    }
};

export const updateOne = async (req, res) => {
    const { error } = articleValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    try {
        cloudinary.v2.uploader.upload(req.files.image.tempFilePath, async (error,result) => {
            await Blog.findOneAndUpdate({
            //_id: req.params.id,
            blogImage: result.url,
            publicId: result.public_id,
            });
        });
    res.status(200);
    } catch {
        res.status(404);
        res.send({ error: "Image doesn't exist!" });
    }

    try {
        const articles = await Blog.findOne({
            _id: req.params.id,
            })

        if (req.body.title) {
            articles.title = req.body.title;
        }

        if (req.body.content) {
            articles.content = req.body.content;
        }

        await articles.save();
        res.send(articles);
    } catch {
        res.status(405).send({ error: "Article doesn't exist!" });
    }

};

export const deleteOne = async (req, res) => {

    cloudinary.v2.uploader.destroy(req.params.publicId, async (error,result) => {
        try {
            await Blog.findOne({ _id: req.params.id });
            res.status(200);
        } catch {
            res.status(404);
            res.send({error: "Article not found"});
        }
        await Blog.deleteOne({ _id: req.params.id });  
        res.status(204);
        res.send({result: "Article deleted successfully"});      
    });    
};
