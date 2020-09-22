const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validators/user");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const webtoken =require("jsonwebtoken");



exports.getUser = async (req, res) => {
    const user = await User.find();
    res.send(user);
};

exports.registerUser = async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const hashed = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, hashed);
    
    try {
        const { email } = req.body;
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            res.status(400).send({error: "Email exists already"});
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPass
        });
        const savedUser= await user.save();
        res.send({ user: user._id, name: user.name, email: user.email});
    } catch (error) {
        res.status(404).send(error);        
    }
    
};

exports.loginUser = async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send("Wrong email");
    }
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
        res.status(400).send("Wrong password");
    }

    const wtoken = webtoken.sign({_id: user._id}, process.env.TOKEN_KEY );
    res.header("auth-token", wtoken).send(wtoken);
};

