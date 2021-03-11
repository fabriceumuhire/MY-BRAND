import User from '../models/User.js';
import { registerValidation, loginValidation } from '../validators/user.js';
import joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import webtoken from 'jsonwebtoken';


class UserAccount {
    static async getUser(req, res) {
        const user = await User.find();
        res.send(user);
        res.status(200);
    };

    static async registerUser(req, res) {

        const { error } = registerValidation(req.body);
        if (error) {
            res.status(400);
            res.send(error.details[0].message);
        }

        const hashed = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, hashed);
        
        try {
            const { email } = req.body;
            const emailExist = await User.findOne({ email: email });
            if (emailExist) {
                res.status(400);
                res.send({error: "Email exists already"});
            }
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            });
            const savedUser= await user.save();
            res.send({ user: user._id, name: user.name, email: user.email});
        } catch (error) {
            res.send(error);        
        }
        
    };

    static async loginUser(req, res) {

        const { error } = loginValidation(req.body);
        if (error) {
            res.status(400);
            res.send(error.details[0].message);
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400);
            res.send("Wrong email");
        }
        const pass = await bcrypt.compare(req.body.password, user.password);
        if (!pass) {
            res.status(400);
            res.send("Wrong password");
        }

        const wtoken = webtoken.sign({ _id: user._id}, process.env.JWT_SECRET );
        
        res.header("auth-token", wtoken);
        res.send(wtoken);
    }
}

export default UserAccount;