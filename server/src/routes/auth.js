const express = require("express");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validators/user");
const Joi = require("@hapi/joi");
const router = express.Router();
const bcrypt = require("bcryptjs");
const webtoken =require("jsonwebtoken");


router.post("/register",async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const hashed = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, hashed);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        res.status(400).send("Email exists!");
    }

    else {

    const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPass
        });
        try {
            const savedUser= await user.save();
            res.send({ user: user._id, name: user.name, email: user.email});
        } catch (error) {
            res.status(404).send(error);
        }
    }
});


router.post("/login",async (req, res) => {

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

    const wtoken = webtoken.sign({_id: user._id},"jsjhdqsdjlqhq" );
    res.header("auth-token", wtoken).send(wtoken);
    //res.send("Logged In");
});

module.exports = router;