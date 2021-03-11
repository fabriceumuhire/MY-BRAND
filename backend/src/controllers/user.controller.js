import bcrypt from 'bcryptjs';
import webtoken from 'jsonwebtoken';
import User from '../models/user.model';
import { registerValidation } from '../validators/user.validator';

export const getUser = async (req, res) => {
  const user = await User.find();
  return res.status(200).send(user);
};

export const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const hashed = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, hashed);

  try {
    const { email } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ error: 'Email exists already' });
    }
    if (!emailExist) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });
      const savedUser = await user.save();
      return res.status(201).send({ message: savedUser });
    }
  } catch (err) {
    return res.send(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const wtoken = webtoken.sign({ _id: user._id }, 'jsjhdqsdjlqhq');
    return res.status(200).send({ user, token: wtoken });
  } catch (error) {
    return res.status(500).send(error);
  }
};
