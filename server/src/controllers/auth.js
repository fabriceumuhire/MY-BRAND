import bcrypt from 'bcryptjs';
import webToken from 'jsonwebtoken';
import User from '../models/User.js';
import { registerValidation, loginValidation } from '../validators/user.js';

class UserAccount {
    static async getUser(req, res) {
        const user = await User.find();
        res.send(user);
        res.status(200);
    };

    static async registerUser(req, res) {
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const hashed = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, hashed);
        
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            });
            return res.status(201).json({ UserID: user._id, name: user.name, email: user.email, password: user.password });
        } catch (error) {
            return res.status(500).json({ error: error.details[0].message });
        }
        
    };

    static async loginUser(req, res) {
        try {
            const { error } = loginValidation(req.body);
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const jwToken = webToken.sign({ _id: user._id}, process.env.JWT_SECRET );
            return res.status(201).json({ Token: jwToken });
        } catch (error) {
            return res.status(500).json({ error: error.details[0].message })
        }
    }
}

export default UserAccount;
