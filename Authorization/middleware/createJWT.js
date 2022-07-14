const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../', '.env'),
});
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN_KEY;

const generateJWT = (token) => {
    const tokenExpires = Math.floor(Math.random() * (60 - 30) + 30);
    const accessToken = jwt.sign(token, TOKEN, { expiresIn: `${tokenExpires}s` });
    return {
        accessToken,
    };
};

module.exports = generateJWT;
