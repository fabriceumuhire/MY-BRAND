import Query from '../models/query.model';
import queryValidation from '../validators/query.validator';

export const getAll = async (req, res) => {
  const post = await Query.find();
  return res.status(200).json(post);
};

export const postOne = async (req, res) => {
  const { error } = queryValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const post = await Query.create({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  return res.status(201).json({ data: post });
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Query.findById(id);
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(500).json({ error: 'Query not found' });
  }
};
