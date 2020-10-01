const jwtoken = require("jsonwebtoken");
require('dotenv').config({ path: "../utils/dotenv"});


module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if(!token) {
        res.status(401).send("Not authorization");
    }
    try {
        const verification = jwtoken.verify(token, `${process.env.TOKEN_KEY}`);
        req.user = verification;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
    
}