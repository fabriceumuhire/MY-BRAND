import Blog from '../models/blog.model';
import {
  blogValidation,
  blogUpdateValidation,
} from '../validators/blog.validator';

export const postOne = async (req, res) => {
  const { error } = blogValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const { title, content } = req.body;
  try {
    const blogs = await Blog.create({
      title,
      content,
      image: req.image,
      imageId: req.imageId,
    });
    return res.status(201).json({ message: blogs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAll = async (req, res) => {
  const blogs = await Blog.find();
  return res.status(200).json(blogs);
};

export const getOne = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    return res.status(200).json({ message: blog });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const updateOne = async (req, res) => {
  const { error } = blogUpdateValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const blogs = await Blog.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true },
    );
    return res.status(200).json({ message: blogs });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

export const deleteOne = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  try {
    await Blog.deleteOne({ _id: req.params.id });
    return res
      .status(204)
      .send({ result: 'Blog deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
