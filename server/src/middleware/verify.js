import jwtoken from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from "../models/User.js"

dotenv.config();({ path: "../utils/"});

export const tokenAuth = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) {
        res.status(401).send("Not authorization");
    }
    try {
        const verification = jwtoken.verify(token, process.env.JWT_SECRET);
        req.user = verification;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token" });
    }
}
export const emailExist = async(req, res, next) => {
    const { email } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        return res.status(400).json({ error: "Email exists already" });
    }
    next();
}

export const authenticationMiddleware = async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json("Wrong email");
    }
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
        return res.status(400).json("Wrong password");
    }
    next();
}