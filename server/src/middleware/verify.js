import jwtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();({ path: "../utils/"});

export const tokenAuth = function (req, res, next) {
    const token = req.header("auth-token");
    if(!token) {
        res.status(401).send("Not authorization");
    }
    try {
        const verification = jwtoken.verify(token, "jsjhdqsdjlqhq");
        req.user = verification;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}